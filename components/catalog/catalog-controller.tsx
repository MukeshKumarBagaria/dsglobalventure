"use client";

import dynamic from "next/dynamic";
import { LoaderCircle } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ViewerDoc, ViewerProduct } from "@/components/catalog/types";
import type { ProductOption } from "@/lib/validation";

function Loading() {
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[rgb(15_42_79/0.35)]" role="status">
      <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink shadow-(--shadow-lift)">
        <LoaderCircle className="size-4 animate-spin text-brand-600" aria-hidden />
        Opening…
      </span>
    </div>
  );
}

// Heavy parts load on demand (PDF.js only when a document is opened).
const PdfViewer = dynamic(() => import("@/components/catalog/pdf-viewer"), { ssr: false, loading: Loading });
const QuoteDialog = dynamic(() => import("@/components/catalog/quote-dialog"), { ssr: false, loading: Loading });

type QuoteState = { slug: string; message?: string };

/**
 * Catalogue interactivity via event delegation: product cards are server-rendered links
 * (`data-doc-open`, `data-quote`) that work without JavaScript; with JavaScript they open
 * the in-page PDF viewer / quotation dialog. Supports deep links: #doc=<id>, #quote=<slug>.
 */
export function CatalogController({
  products,
  docs,
  options,
  workerUrl,
}: {
  products: ViewerProduct[];
  docs: ViewerDoc[];
  options: ProductOption[];
  workerUrl: string;
}) {
  const [docId, setDocId] = useState<string | null>(null);
  const [quote, setQuote] = useState<QuoteState | null>(null);
  const warmed = useRef(new Set<string>());

  const setHash = (hash: string) => {
    const url = `${window.location.pathname}${window.location.search}${hash ? `#${hash}` : ""}`;
    window.history.replaceState(window.history.state, "", url);
  };

  const openDoc = useCallback((id: string) => {
    setQuote(null);
    setDocId(id);
    setHash(`doc=${id}`);
  }, []);

  const openQuote = useCallback((q: QuoteState) => {
    setDocId(null);
    setQuote(q);
    setHash(`quote=${q.slug}`);
  }, []);

  const closeAll = useCallback(() => {
    setDocId(null);
    setQuote(null);
    setHash("");
  }, []);

  /** Warm the viewer chunk, PDF.js worker and the PDF itself on hover/focus. */
  const prefetch = useCallback(
    (id: string) => {
      if (warmed.current.has(id)) return;
      const first = warmed.current.size === 0;
      warmed.current.add(id);
      const doc = docs.find((d) => d.id === id);
      const add = (href: string) => {
        const link = document.createElement("link");
        link.rel = "prefetch";
        link.href = href;
        document.head.appendChild(link);
      };
      if (first) {
        void import("@/components/catalog/pdf-viewer");
        add(workerUrl);
      }
      if (doc) add(doc.url);
    },
    [docs, workerUrl],
  );

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const target = e.target as Element | null;
      const docEl = target?.closest<HTMLElement>("[data-doc-open]");
      if (docEl?.dataset.docOpen) {
        e.preventDefault();
        openDoc(docEl.dataset.docOpen);
        return;
      }
      const quoteEl = target?.closest<HTMLElement>("[data-quote]");
      if (quoteEl?.dataset.quote) {
        e.preventDefault();
        openQuote({ slug: quoteEl.dataset.quote, message: quoteEl.dataset.quoteMessage });
      }
    };
    const onWarm = (e: Event) => {
      const el = (e.target as Element | null)?.closest?.<HTMLElement>("[data-doc-open]");
      if (el?.dataset.docOpen) prefetch(el.dataset.docOpen);
    };
    const readHash = () => {
      const params = new URLSearchParams(window.location.hash.slice(1));
      const d = params.get("doc");
      const q = params.get("quote");
      if (d && docs.some((x) => x.id === d)) {
        setQuote(null);
        setDocId(d);
      } else if (q && products.some((p) => p.slug === q)) {
        setDocId(null);
        setQuote({ slug: q });
      }
    };
    document.addEventListener("click", onClick);
    document.addEventListener("pointerover", onWarm, { passive: true });
    document.addEventListener("focusin", onWarm);
    window.addEventListener("hashchange", readHash);
    const frame = requestAnimationFrame(readHash);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onClick);
      document.removeEventListener("pointerover", onWarm);
      document.removeEventListener("focusin", onWarm);
      window.removeEventListener("hashchange", readHash);
    };
  }, [docs, products, openDoc, openQuote, prefetch]);

  const activeDoc = docId ? docs.find((d) => d.id === docId) : undefined;
  const viewerProduct = activeDoc ? products.find((p) => p.slug === activeDoc.productSlug) : undefined;
  const quoteProduct = quote ? products.find((p) => p.slug === quote.slug) : undefined;

  return (
    <>
      {activeDoc && viewerProduct ? (
        <PdfViewer
          product={viewerProduct}
          docs={docs.filter((d) => d.productSlug === viewerProduct.slug)}
          activeId={activeDoc.id}
          onSwitch={openDoc}
          onClose={closeAll}
          onQuote={(slug) => openQuote({ slug })}
        />
      ) : null}
      {quoteProduct ? <QuoteDialog product={quoteProduct} message={quote?.message} options={options} onClose={closeAll} /> : null}
    </>
  );
}
