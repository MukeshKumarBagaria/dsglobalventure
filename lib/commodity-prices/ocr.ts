import type { Worker } from "tesseract.js";

/**
 * Reads a SunSirs screenshot in the browser with Tesseract (free, nothing is uploaded anywhere).
 * Pass 1 finds the table's "Commodity … Change" header; pass 2 re-reads just the table, enlarged and greyscaled —
 * on real screenshots that took OCR from several misread digits to none. Browser-only (canvas, workers).
 */

export type OcrProgress = { stage: "loading" | "locating" | "reading"; progress: number; detail?: string };

type Rect = { x: number; y: number; w: number; h: number };

// loaded on first use only — the OCR engine (~2MB plus English data from the tesseract CDN) never touches other pages
const tesseract = () => import("tesseract.js");
let workerPromise: Promise<Worker> | null = null;
/** receives Tesseract's status messages ("loading language traineddata", "recognizing text", …) for the current job */
let listener: ((m: { status: string; progress: number }) => void) | null = null;

function getWorker() {
  workerPromise ??= tesseract().then(({ createWorker }) =>
    createWorker("eng", 1, { logger: (m: { status: string; progress: number }) => listener?.(m) }),
  );
  // a failed start (e.g. offline) shouldn't poison later attempts
  workerPromise.catch(() => (workerPromise = null));
  return workerPromise;
}

function drawToCanvas(source: CanvasImageSource, rect: Rect, scale: number, grayscale: boolean) {
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(rect.w * scale);
  canvas.height = Math.round(rect.h * scale);
  const ctx = canvas.getContext("2d")!;
  ctx.imageSmoothingQuality = "high";
  if (grayscale) ctx.filter = "grayscale(1) contrast(1.15)";
  ctx.drawImage(source, rect.x, rect.y, rect.w, rect.h, 0, 0, canvas.width, canvas.height);
  return canvas;
}

type Word = { text: string; bbox: { x0: number; y0: number; x1: number; y1: number } };

/** The table area: from the "Commodity" header (on the same line as "Change") down to the bottom of the image */
function findTable(words: Word[], factor: number, width: number, height: number): Rect | null {
  const changes = words.filter((w) => /^change$/i.test(w.text));
  for (const change of changes) {
    const mid = (change.bbox.y0 + change.bbox.y1) / 2;
    const commodity = words.find(
      (w) => /^commodity$/i.test(w.text) && w.bbox.x1 < change.bbox.x0 && w.bbox.y0 - 8 <= mid && mid <= w.bbox.y1 + 8,
    );
    if (!commodity) continue;
    const pad = 14;
    const x = Math.max(0, commodity.bbox.x0 - pad) / factor;
    const right = Math.min(width * factor, change.bbox.x1 + (change.bbox.x1 - change.bbox.x0) * 1.6 + pad) / factor;
    const y = Math.max(0, commodity.bbox.y0 - pad) / factor;
    return { x, y, w: right - x, h: height - y };
  }
  return null;
}

/** OCR text of the price table in one screenshot */
export async function readScreenshot(file: Blob, onProgress?: (p: OcrProgress) => void): Promise<string> {
  let stage: OcrProgress["stage"] = "loading";
  listener = (m) => onProgress?.({ stage, progress: m.progress, detail: m.status });
  onProgress?.({ stage, progress: 0 });
  const bitmap = await createImageBitmap(file);
  const [worker, { PSM }] = await Promise.all([getWorker(), tesseract()]);
  const full: Rect = { x: 0, y: 0, w: bitmap.width, h: bitmap.height };

  try {
    // pass 1 — locate the table (a smaller copy is enough to find the header words)
    const factor = Math.min(1, 1800 / bitmap.width);
    stage = "locating";
    await worker.setParameters({ tessedit_pageseg_mode: PSM.AUTO });
    const located = await worker.recognize(drawToCanvas(bitmap, full, factor, false), {}, { blocks: true, text: false });
    const words = (located.data.blocks ?? []).flatMap((b) => b.paragraphs.flatMap((p) => p.lines.flatMap((l) => l.words)));
    const table = findTable(words, factor, bitmap.width, bitmap.height) ?? full;

    // pass 2 — read the table enlarged (≈2400px wide) in greyscale, keeping column gaps as runs of spaces
    const scale = Math.min(4, Math.max(1, 2400 / table.w));
    stage = "reading";
    await worker.setParameters({ tessedit_pageseg_mode: PSM.SINGLE_BLOCK, preserve_interword_spaces: "1" });
    const read = await worker.recognize(drawToCanvas(bitmap, table, scale, true));
    return read.data.text;
  } finally {
    listener = null;
    bitmap.close();
  }
}
