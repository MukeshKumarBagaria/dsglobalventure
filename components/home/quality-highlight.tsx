import { FileText } from "lucide-react";
import type { CSSProperties } from "react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const docs = [
  { title: "Certificate of Analysis", code: "COA" },
  { title: "Safety Data Sheet", code: "SDS / MSDS" },
  { title: "Product Specification", code: "SPEC" },
  { title: "Packing Details", code: "PACK" },
  { title: "Batch Information", code: "BATCH" },
];

function DocCard({ doc, index }: { doc: (typeof docs)[number]; index: number }) {
  const center = (docs.length - 1) / 2;
  const offset = index - center;

  return (
    <div
      style={{ "--o": offset, "--oa": Math.abs(offset), zIndex: 10 - Math.abs(offset) } as CSSProperties}
      className="doc-card absolute top-0 left-1/2 w-[210px] -ml-[105px] rounded-2xl border border-white bg-gradient-to-b from-white to-[#f4f8fe] p-5 shadow-[0_30px_60px_-25px_rgb(16_41_74/0.35)] sm:w-[240px] sm:-ml-[120px]"
    >
      <div className="flex items-center justify-between">
        <span className="flex size-9 items-center justify-center rounded-lg bg-brandwash text-brand-700">
          <FileText className="size-4" aria-hidden />
        </span>
        <span className="rounded-full bg-brand-500/10 px-2.5 py-1 font-mono text-[0.62rem] font-semibold tracking-wider text-brand-700">
          {doc.code}
        </span>
      </div>
      <p className="mt-5 font-display text-[0.95rem] leading-snug font-bold text-ink">{doc.title}</p>
      <div className="mt-4 space-y-1.5" aria-hidden>
        <span className="block h-1.5 w-full rounded-full bg-ink/10" />
        <span className="block h-1.5 w-4/5 rounded-full bg-ink/10" />
        <span className="block h-1.5 w-3/5 rounded-full bg-ink/10" />
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-ink/10 pt-3 font-mono text-[0.6rem] text-muted">
        <span>DS GLOBAL VENTURES</span>
        <span>REF · {String(index + 1).padStart(3, "0")}</span>
      </div>
    </div>
  );
}

export function QualityHighlight() {
  return (
    <section className="surface-blue section-y relative overflow-hidden">
      <div className="bg-grid-light pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <div className="container-x relative grid items-center gap-16 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Quality & Documentation"
            title="Product Information You Can Rely On"
            lead="Chemical procurement requires accurate product information and appropriate documentation. We coordinate relevant documents with customers and suppliers as applicable to the product and transaction."
          />
          <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-3">
            <Button href="/quality">Quality &amp; Documentation</Button>
            <Button href="/contact?doc=SDS" variant="white" arrow={false}>
              Request COA / SDS
            </Button>
          </Reveal>
        </div>
        <div className="doc-stack relative h-[340px] sm:h-[380px]" aria-label="Documentation coordinated" role="img">
          {docs.map((doc, i) => (
            <DocCard key={doc.code} doc={doc} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
