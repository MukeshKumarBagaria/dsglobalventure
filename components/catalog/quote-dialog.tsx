"use client";

import { FileText, X } from "lucide-react";
import { useId } from "react";
import { Modal } from "@/components/catalog/modal";
import type { ViewerProduct } from "@/components/catalog/types";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import type { ProductOption } from "@/lib/validation";

/** Quotation request for one catalogue product (product pre-selected and locked). */
export default function QuoteDialog({
  product,
  message,
  options,
  onClose,
}: {
  product: ViewerProduct;
  message?: string;
  options: ProductOption[];
  onClose: () => void;
}) {
  const titleId = useId();
  return (
    <Modal onClose={onClose} labelledBy={titleId} variant="sheet">
      <div className="dialog-panel flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-[1.75rem] bg-white shadow-[0_40px_90px_-30px_rgb(15_42_79/0.5)] sm:max-h-[min(92dvh,920px)] sm:w-[min(44rem,calc(100vw-3rem))] sm:rounded-[1.75rem]">
        <header className="surface-soft relative flex items-start justify-between gap-4 border-b border-line px-5 py-5 sm:px-8 sm:py-6">
          <div className="flex min-w-0 items-start gap-4">
            <span className="hidden size-12 shrink-0 items-center justify-center rounded-2xl bg-brandwash text-brand-700 sm:flex">
              <FileText className="size-6" strokeWidth={1.5} aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold tracking-[0.18em] text-brand-600 uppercase">Request a Quotation</p>
              <h2 id={titleId} className="mt-1.5 text-2xl font-bold tracking-tight">
                {product.name}
              </h2>
              <p className="mt-1 font-mono text-xs text-muted">CAS {product.cas}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            autoFocus
            aria-label="Close"
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:border-brand-500/50 hover:text-brand-700"
          >
            <X className="size-5" aria-hidden />
          </button>
        </header>
        <div className="overflow-y-auto overscroll-contain px-5 py-6 sm:px-8 sm:py-7">
          <p className="mb-6 text-sm leading-relaxed">
            Share your quantity, delivery location and any grade or packaging requirement — our team will respond with
            availability and commercial terms.
          </p>
          <EnquiryForm defaultProduct={product.slug} lockProduct defaultMessage={message ?? ""} submitLabel="Request Quotation" options={options} />
        </div>
      </div>
    </Modal>
  );
}
