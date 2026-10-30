// Copies the PDF.js worker that matches the installed pdfjs-dist into /public/pdfjs,
// with the version in the filename so it can be cached immutably.
import { copyFileSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
const pkgPath = require.resolve("pdfjs-dist/package.json");
const { version } = require(pkgPath);
const src = join(dirname(pkgPath), "build", "pdf.worker.min.mjs");
const outDir = join(process.cwd(), "public", "pdfjs");

mkdirSync(outDir, { recursive: true });
for (const f of readdirSync(outDir)) if (f.startsWith("pdf.worker")) rmSync(join(outDir, f));
copyFileSync(src, join(outDir, `pdf.worker.${version}.min.mjs`));
console.log(`[pdfjs] worker ${version} copied to public/pdfjs`);
