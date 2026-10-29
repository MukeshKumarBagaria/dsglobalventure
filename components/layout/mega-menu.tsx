import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { FlaskConical } from "lucide-react";
import { productNav } from "@/content/navigation";
import { cx as cn } from "@/lib/cx";

export function MegaMenu({ open, onNavigate }: { open: boolean; onNavigate: () => void }) {
  const items = productNav.filter((p) => p.slug !== "other");

  return (
    <div
      aria-hidden={!open}
      className={cn(
        "absolute top-full left-1/2 w-[780px] -translate-x-1/2 pt-4 transition-[opacity,transform,visibility] duration-300 ease-(--ease-out-expo)",
        open ? "visible translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0",
      )}
    >
      <div className="grid grid-cols-[1fr_260px] gap-3 rounded-3xl border border-line bg-white/95 p-3 shadow-[0_40px_80px_-30px_rgb(16_41_74/0.35)]">
        <ul className="grid grid-cols-2 gap-1">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                tabIndex={open ? undefined : -1}
                onClick={onNavigate}
                className="group flex items-center gap-3 rounded-2xl p-3 transition-colors hover:bg-mist"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-line bg-mist text-brand-600 transition-colors group-hover:border-brand-500/40 group-hover:bg-brandwash">
                  <FlaskConical className="size-5" strokeWidth={1.5} aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="flex items-center gap-1 font-display text-[0.92rem] font-semibold text-ink">
                    {item.label}
                    <ArrowUpRight
                      className="size-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                      aria-hidden
                    />
                  </span>
                  <span className="mt-0.5 block font-mono text-[0.7rem] tracking-wide text-muted">{item.meta}</span>
                </span>
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/products"
              tabIndex={open ? undefined : -1}
              onClick={onNavigate}
              className="group flex h-full items-center justify-center gap-2 rounded-2xl border border-dashed border-line p-3 text-sm font-medium text-body transition-colors hover:border-brand-500 hover:text-brand-700"
            >
              View all products
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </li>
        </ul>

        <Link
          href="/products/other-chemicals"
          tabIndex={open ? undefined : -1}
          onClick={onNavigate}
          className="group relative flex flex-col justify-between overflow-hidden rounded-2xl surface-blue border border-brand-500/15 p-5"
        >
          <div className="bg-grid-light absolute inset-0 opacity-60" aria-hidden />
          <div className="relative">
            <p className="font-mono text-[0.68rem] tracking-[0.18em] text-brand-700 uppercase">Can&apos;t find your chemical?</p>
            <p className="mt-3 text-sm leading-relaxed text-body">
              Our portfolio can be expanded to your requirement. Share the product name, specification and quantity.
            </p>
          </div>
          <span className="relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
            Send Your Requirement
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </span>
        </Link>
      </div>
    </div>
  );
}
