import type { ReactNode } from "react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Eyebrow } from "@/components/ui/section-heading";

export function LegalPage({
  title,
  href,
  updated = "October 2026",
  children,
}: {
  title: string;
  href: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <>
      <section data-hero="" className="surface-soft relative overflow-hidden">
        <div className="bg-grid-light absolute inset-0 opacity-70" aria-hidden />
        <div className="container-x relative pt-40 pb-16 lg:pt-48 lg:pb-20">
          <Breadcrumb items={[{ label: title, href }]} />
          <Eyebrow className="mt-8">
            Legal
          </Eyebrow>
          <h1 className="mt-5 text-[clamp(2.25rem,5vw,3.75rem)] font-bold tracking-tight text-ink">{title}</h1>
          <p className="mt-4 font-mono text-xs tracking-[0.14em] text-muted uppercase">Last updated: {updated}</p>
        </div>
      </section>
      <section className="section-y bg-white">
        <div className="prose-legal container-x max-w-3xl text-[1.0625rem] text-body [&_h2]:text-ink">{children}</div>
      </section>
    </>
  );
}
