import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Molecule } from "@/components/molecules/molecule";
import { GlowCard } from "@/components/ui/glow-card";
import type { Product } from "@/content/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <GlowCard className="group flex h-full flex-col rounded-3xl border border-line bg-white p-6 shadow-(--shadow-card) transition-[transform,box-shadow] duration-500 ease-(--ease-out-expo) hover:-translate-y-1.5 hover:shadow-(--shadow-lift) sm:p-7">
      <div className="bg-dots-light relative flex h-40 items-center justify-center overflow-hidden rounded-2xl border border-line bg-mist px-8 transition-colors duration-500 group-hover:border-brand-500/30">
        <div className="w-full max-w-[168px] transition-transform duration-700 ease-(--ease-out-expo) group-hover:scale-105">
          <Molecule name={product.slug} tone="light" />
        </div>
        <span className="absolute top-3 right-3 rounded-full border border-line bg-white px-2.5 py-1 font-mono text-[0.68rem] font-medium tracking-wide text-body">
          CAS {product.cas}
        </span>
        <span className="absolute bottom-3 left-3 font-mono text-[0.68rem] text-muted">{product.molecularWeight}</span>
      </div>

      <h3 className="mt-7 text-2xl font-bold tracking-tight">
        <Link href={`/products/${product.slug}`} prefetch className="after:absolute after:inset-0 after:z-0">
          {product.name}
        </Link>
      </h3>
      <p className="mt-1 font-mono text-[0.8rem] text-brand-600">{product.formulaDisplay}</p>
      <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed">{product.short}</p>

      <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Applications">
        {product.listingApplications.slice(0, 3).map((a) => (
          <li key={a} className="rounded-full bg-mist px-3 py-1 text-[0.72rem] font-medium text-ink/75">
            {a}
          </li>
        ))}
      </ul>

      <div className="relative z-10 mt-7 flex items-center justify-between border-t border-line pt-5">
        <Link
          href={`/products/${product.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors hover:text-brand-600"
        >
          View Details
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </Link>
        <Link
          href={`/contact?product=${product.slug}`}
          className="inline-flex items-center gap-1 rounded-full bg-brandwash px-4 py-2 text-xs font-semibold text-brand-700 transition-colors hover:bg-brand-600 hover:text-white"
        >
          Request Quote
          <ArrowUpRight className="size-3.5" aria-hidden />
        </Link>
      </div>
    </GlowCard>
  );
}

export function OtherChemicalsCard() {
  return (
    <div className="surface-blue group relative flex h-full flex-col overflow-hidden rounded-3xl border border-brand-500/15 p-6 sm:p-7">
      <div className="bg-grid-light absolute inset-0 opacity-70" aria-hidden />
      <div className="relative flex h-40 items-center justify-center rounded-2xl border border-white bg-white/70 px-8">
        <div className="w-full max-w-[168px]">
          <Molecule name="other" />
        </div>
      </div>
      <h3 className="relative mt-7 text-2xl font-bold tracking-tight">Other Chemicals</h3>
      <p className="relative mt-1 font-mono text-[0.8rem] text-brand-700">On request</p>
      <p className="relative mt-4 flex-1 text-[0.95rem] leading-relaxed">
        Looking for a chemical that is not listed? Send us the product name, specification and quantity.
      </p>
      <Link
        href="/products/other-chemicals"
        className="relative mt-7 inline-flex items-center gap-2 border-t border-brand-500/20 pt-5 text-sm font-semibold text-brand-700 after:absolute after:inset-0 hover:text-brand-600"
      >
        Send Your Requirement
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
      </Link>
    </div>
  );
}
