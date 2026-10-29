import { MessageCircleQuestion } from "lucide-react";
import { Accordion, type AccordionItem } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { jsonLd } from "@/lib/utils";

export function FaqSection({
  items,
  title = "Frequently Asked Questions",
  eyebrow = "FAQ",
  className = "bg-white",
}: {
  items: AccordionItem[];
  title?: string;
  eyebrow?: string;
  className?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };

  return (
    <section className={`section-y ${className}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow={eyebrow} title={title} />
          <Reveal delay={0.2} className="mt-10 rounded-3xl border border-line bg-mist p-6">
            <MessageCircleQuestion className="size-7 text-brand-600" strokeWidth={1.5} aria-hidden />
            <p className="mt-4 font-display font-semibold text-ink">Have a different question?</p>
            <p className="mt-1.5 text-sm leading-relaxed">
              Share your requirement and our team will answer product, documentation and supply questions directly.
            </p>
            <Button href="/contact" variant="link" className="mt-4">
              Contact our team
            </Button>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="lg:col-span-7">
          <Accordion items={items} />
        </Reveal>
      </div>
    </section>
  );
}
