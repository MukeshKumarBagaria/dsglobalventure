"use client";

import { Download, ExternalLink, LoaderCircle, Send, X, ZoomIn, ZoomOut } from "lucide-react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import { Modal } from "@/components/catalog/modal";
import type { ViewerDoc, ViewerProduct } from "@/components/catalog/types";
import { cx } from "@/lib/cx";

// Worker copied to /public/pdfjs by scripts/copy-pdf-worker.mjs (version-matched, cached immutably).
pdfjs.GlobalWorkerOptions.workerSrc = `/pdfjs/pdf.worker.${pdfjs.version}.min.mjs`;

/** PDF.js 6 needs modern JS (Chrome 125+, Safari 18+). Older browsers get the native viewer. */
function pdfJsSupported() {
  return (
    typeof (Promise as unknown as { withResolvers?: unknown }).withResolvers === "function" &&
    typeof (URL as unknown as { parse?: unknown }).parse === "function"
  );
}

const PAGE_RATIO = 1224 / 945; // US Letter, matches the preview images
const ZOOM_STEPS = [0.6, 0.8, 1, 1.25, 1.5, 1.75, 2];

function IconAction({
  label,
  onClick,
  href,
  download,
  external,
  disabled,
  autoFocus,
  children,
  className,
}: {
  label: string;
  onClick?: () => void;
  href?: string;
  download?: string;
  external?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  children: ReactNode;
  className?: string;
}) {
  const cls = cx(
    "inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:border-brand-500/50 hover:text-brand-700 disabled:opacity-40",
    className,
  );
  if (href)
    return (
      <a
        href={href}
        aria-label={label}
        title={label}
        className={cls}
        {...(download ? { download } : {})}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  return (
    <button type="button" aria-label={label} title={label} onClick={onClick} disabled={disabled} autoFocus={autoFocus} className={cls}>
      {children}
    </button>
  );
}

export default function PdfViewer({
  product,
  docs,
  activeId,
  onSwitch,
  onClose,
  onQuote,
}: {
  product: ViewerProduct;
  docs: ViewerDoc[];
  activeId: string;
  onSwitch: (id: string) => void;
  onClose: () => void;
  onQuote: (slug: string) => void;
}) {
  const titleId = useId();
  const doc = docs.find((d) => d.id === activeId) ?? docs[0];
  const scrollRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [zoomIndex, setZoomIndex] = useState(2);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [current, setCurrent] = useState(1);
  const [failed, setFailed] = useState(false);
  const [supported] = useState(pdfJsSupported);
  const [dpr] = useState(() => Math.min(2, window.devicePixelRatio || 1));

  // reset per-document state when switching documents
  const [shownId, setShownId] = useState(doc.id);
  if (shownId !== doc.id) {
    setShownId(doc.id);
    setNumPages(null);
    setCurrent(1);
    setFailed(false);
  }

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setContainerWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "+" || e.key === "=") setZoomIndex((z) => Math.min(ZOOM_STEPS.length - 1, z + 1));
      else if (e.key === "-") setZoomIndex((z) => Math.max(0, z - 1));
      else if (e.key === "0") setZoomIndex(2);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const zoom = ZOOM_STEPS[zoomIndex];
  const gutter = containerWidth < 640 ? 24 : 72;
  const baseWidth = Math.max(260, Math.min(containerWidth - gutter, 880));
  const pageWidth = Math.round((containerWidth ? baseWidth : 600) * zoom);
  const pageCount = numPages ?? doc.pages;

  // track which page is in view
  useEffect(() => {
    const root = scrollRef.current;
    if (!root || failed || !supported) return;
    const io = new IntersectionObserver(
      (entries) => {
        const best = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (best) setCurrent(Number((best.target as HTMLElement).dataset.page));
      },
      { root, threshold: [0.2, 0.5, 0.8] },
    );
    root.querySelectorAll("[data-page]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pageCount, doc.id, pageWidth, failed, supported]);

  const preview = (
    // eslint-disable-next-line @next/next/no-img-element -- instant page-1 placeholder while PDF.js renders
    <img src={doc.preview} alt="" width={945} height={1224} className="block h-auto w-full" decoding="async" />
  );

  return (
    <Modal onClose={onClose} labelledBy={titleId} variant="full">
      <div className="dialog-panel flex h-full w-full flex-col bg-[#eaf0f9]">
        {/* Toolbar */}
        <header className="flex flex-wrap items-center gap-x-4 gap-y-3 border-b border-line bg-white/95 px-3 py-3 sm:px-6">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <span className="shrink-0 rounded-lg bg-brand-600 px-2.5 py-1 font-mono text-xs font-bold tracking-wider text-white">
              {doc.type}
            </span>
            <div className="min-w-0">
              <h2 id={titleId} className="truncate text-base font-bold tracking-tight sm:text-lg">
                {product.name}
              </h2>
              <p className="truncate text-xs text-muted">
                {doc.label} · {pageCount} {pageCount === 1 ? "page" : "pages"} · {doc.sizeKB} KB
              </p>
            </div>
          </div>

          {docs.length > 1 ? (
            <div role="tablist" aria-label="Documents" className="order-last flex w-full gap-1 rounded-full bg-mist p-1 sm:order-none sm:w-auto">
              {docs.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  role="tab"
                  aria-selected={d.id === doc.id}
                  onClick={() => onSwitch(d.id)}
                  className={cx(
                    "flex-1 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors sm:flex-none",
                    d.id === doc.id ? "bg-white text-brand-700 shadow-(--shadow-card)" : "text-body hover:text-ink",
                  )}
                >
                  {d.label}
                </button>
              ))}
            </div>
          ) : null}

          <div className="flex items-center gap-1.5">
            {supported && !failed ? (
              <div className="hidden items-center gap-1 rounded-full border border-line bg-white p-1 md:flex">
                <button
                  type="button"
                  aria-label="Zoom out"
                  onClick={() => setZoomIndex((z) => Math.max(0, z - 1))}
                  disabled={zoomIndex === 0}
                  className="flex size-8 items-center justify-center rounded-full text-ink hover:bg-mist disabled:opacity-40"
                >
                  <ZoomOut className="size-4" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomIndex(2)}
                  className="min-w-14 rounded-full px-2 py-1 font-mono text-xs font-semibold text-ink hover:bg-mist"
                  aria-label="Reset zoom"
                >
                  {Math.round(zoom * 100)}%
                </button>
                <button
                  type="button"
                  aria-label="Zoom in"
                  onClick={() => setZoomIndex((z) => Math.min(ZOOM_STEPS.length - 1, z + 1))}
                  disabled={zoomIndex === ZOOM_STEPS.length - 1}
                  className="flex size-8 items-center justify-center rounded-full text-ink hover:bg-mist disabled:opacity-40"
                >
                  <ZoomIn className="size-4" aria-hidden />
                </button>
              </div>
            ) : null}
            {supported && !failed && pageCount > 1 ? (
              <span className="hidden rounded-full bg-mist px-3 py-2 font-mono text-xs font-semibold text-ink lg:inline">
                {current} / {pageCount}
              </span>
            ) : null}
            <IconAction label={`Download ${doc.file}`} href={doc.url} download={doc.file}>
              <Download className="size-4" aria-hidden />
            </IconAction>
            <IconAction label="Open PDF in a new tab" href={doc.url} external className="max-sm:hidden">
              <ExternalLink className="size-4" aria-hidden />
            </IconAction>
            <button
              type="button"
              onClick={() => onQuote(product.slug)}
              className="hidden h-10 items-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-brand-700 px-4 text-sm font-semibold text-white shadow-[0_10px_24px_-12px_rgb(30_99_214/0.8)] transition-[filter] hover:brightness-110 sm:inline-flex"
            >
              <Send className="size-4" aria-hidden />
              Request Quotation
            </button>
            <IconAction label="Close document" onClick={onClose} autoFocus>
              <X className="size-5" aria-hidden />
            </IconAction>
          </div>
        </header>

        {/* Pages */}
        <div ref={scrollRef} className="relative flex-1 overflow-auto overscroll-contain" tabIndex={-1}>
          {supported && !failed ? (
            <div className="w-max min-w-full px-3 py-6 sm:px-9 sm:py-9">
              <Document
                key={doc.id}
                file={doc.url}
                suspense={false}
                onLoadSuccess={({ numPages: n }) => setNumPages(n)}
                onLoadError={() => setFailed(true)}
                onSourceError={() => setFailed(true)}
                error={null}
                loading={
                  <div className="mx-auto" style={{ width: pageWidth }}>
                    <div className="relative overflow-hidden rounded-md bg-white shadow-[0_18px_40px_-18px_rgb(15_42_79/0.35)]">
                      {preview}
                      <span className="absolute top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-brand-700/90 px-3 py-1.5 text-xs font-medium text-white">
                        <LoaderCircle className="size-3.5 animate-spin" aria-hidden />
                        Loading document…
                      </span>
                    </div>
                  </div>
                }
                className="flex flex-col items-center gap-6"
              >
                {Array.from({ length: pageCount }, (_, i) => (
                  <div
                    key={`${doc.id}-${i}`}
                    data-page={i + 1}
                    className="relative overflow-hidden rounded-md bg-white shadow-[0_18px_40px_-18px_rgb(15_42_79/0.35)]"
                    style={{ width: pageWidth, minHeight: Math.round(pageWidth * PAGE_RATIO) }}
                  >
                    <Page
                      pageNumber={i + 1}
                      width={pageWidth}
                      devicePixelRatio={dpr}
                      suspense={false}
                      renderAnnotationLayer={false}
                      renderTextLayer
                      loading={i === 0 ? preview : <div className="pdf-skeleton absolute inset-0" />}
                      error={null}
                    />
                  </div>
                ))}
              </Document>
            </div>
          ) : (
            <NativeFallback doc={doc} />
          )}
        </div>

        {/* Mobile action bar */}
        <div className="grid grid-cols-2 gap-2 border-t border-line bg-white px-3 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] sm:hidden">
          <a
            href={doc.url}
            download={doc.file}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-line text-sm font-semibold text-ink"
          >
            <Download className="size-4" aria-hidden />
            Download
          </a>
          <button
            type="button"
            onClick={() => onQuote(product.slug)}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-brand-700 text-sm font-semibold text-white"
          >
            <Send className="size-4" aria-hidden />
            Request Quote
          </button>
        </div>
      </div>
    </Modal>
  );
}

/** Older browsers / load failure: browser's own PDF viewer plus direct actions. */
function NativeFallback({ doc }: { doc: ViewerDoc }) {
  return (
    <div className="mx-auto flex h-full max-w-5xl flex-col gap-4 p-3 sm:p-8">
      <object data={`${doc.url}#view=FitH`} type="application/pdf" className="min-h-[60vh] w-full flex-1 rounded-xl border border-line bg-white">
        <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
          <p className="font-display text-lg font-semibold text-ink">Preview not available in this browser</p>
          <p className="max-w-sm text-sm">Open or download the PDF to view it.</p>
        </div>
      </object>
      <div className="flex flex-wrap justify-center gap-3">
        <a
          href={doc.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-brand-700 px-6 text-sm font-semibold text-white"
        >
          <ExternalLink className="size-4" aria-hidden />
          Open PDF
        </a>
        <a
          href={doc.url}
          download={doc.file}
          className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-white px-6 text-sm font-semibold text-ink"
        >
          <Download className="size-4" aria-hidden />
          Download
        </a>
      </div>
    </div>
  );
}
