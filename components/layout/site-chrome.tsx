import { Suspense, type ReactNode } from "react";
import pdfjsPkg from "pdfjs-dist/package.json";
import { CatalogController } from "@/components/catalog/catalog-controller";
import type { ViewerDoc, ViewerProduct } from "@/components/catalog/types";
import { CrudeTicker } from "@/components/layout/crude-ticker";
import { FloatingActions } from "@/components/layout/floating-actions";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { catalog, catalogDocuments, docLabels, documentUrl, previewUrl } from "@/content/catalog";
import { productMenu } from "@/content/navigation";
import { productOptions } from "@/content/products";

const viewerProducts: ViewerProduct[] = catalog.map(({ slug, name, cas }) => ({ slug, name, cas }));
const viewerDocs: ViewerDoc[] = catalogDocuments.map((d) => ({
  id: d.id,
  type: d.type,
  label: docLabels[d.type].long,
  url: documentUrl(d),
  preview: previewUrl(d),
  file: d.file,
  pages: d.pages,
  sizeKB: d.sizeKB,
  productSlug: d.product.slug,
}));

/**
 * DS Global Ventures header, footer and floating actions. Used by the (site) route group and the 404 page;
 * sister-business pages such as /ds-construction bring their own chrome.
 * The catalogue controller is site-wide so any `data-doc-open` link (mega menu, product pages, catalogue)
 * opens the in-page PDF viewer, and #doc= / #quote= deep links work on every page.
 */
export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="fixed top-3 left-3 z-[100] -translate-y-20 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <Header
        productMenu={productMenu}
        ticker={
          <Suspense fallback={null}>
            <CrudeTicker />
          </Suspense>
        }
      />
      <main id="main">{children}</main>
      <Footer />
      <FloatingActions />
      <CatalogController
        products={viewerProducts}
        docs={viewerDocs}
        options={productOptions}
        workerUrl={`/pdfjs/pdf.worker.${pdfjsPkg.version}.min.mjs`}
      />
    </>
  );
}
