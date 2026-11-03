"use client";

import Link from "next/link";
import { ArrowUpRight, Building2, ChevronDown } from "lucide-react";
import { useRef, useState } from "react";
import { businessNav } from "@/content/main-nav";
import { cx as cn } from "@/lib/cx";

/** Desktop "Our Other Businesses" dropdown — opens on hover or keyboard focus, closes on leave, blur or Escape. */
export function BusinessesMenu({ label, href, active }: { label: string; href: string; active: boolean }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);
  const ref = useRef<HTMLLIElement>(null);

  const show = () => {
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hide = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), 140);
  };

  return (
    <li
      ref={ref}
      className="relative"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={(e) => {
        if (!ref.current?.contains(e.relatedTarget as Node)) hide();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
    >
      <Link
        href={href}
        aria-expanded={open}
        aria-haspopup="true"
        className={cn(
          "flex items-center gap-1.5 rounded-full px-2.5 py-2 text-[0.875rem] font-medium whitespace-nowrap transition-colors 2xl:px-3.5",
          active ? "text-brand-700" : "text-ink/75 hover:text-ink",
        )}
      >
        {label}
        <ChevronDown className={cn("size-3.5 transition-transform duration-300", open && "rotate-180")} aria-hidden />
      </Link>

      <div
        aria-hidden={!open}
        className={cn(
          "absolute top-full right-0 w-[360px] pt-4 transition-[opacity,transform,visibility] duration-300 ease-(--ease-out-expo)",
          open ? "visible translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0",
        )}
      >
        <div className="rounded-3xl border border-line bg-white/95 p-3 shadow-[0_40px_80px_-30px_rgb(16_41_74/0.35)]">
          <p className="px-3 pt-2 pb-3 font-mono text-[0.68rem] tracking-[0.16em] text-muted uppercase">
            The DS Global Ventures group
          </p>
          <ul>
            {businessNav.map((b) => (
              <li key={b.href}>
                <Link
                  href={b.href}
                  tabIndex={open ? undefined : -1}
                  onClick={() => setOpen(false)}
                  className="group flex items-center gap-4 rounded-2xl p-3 transition-colors hover:bg-[#f6f1e7]"
                >
                  {/* the business's own brass-on-bronze colours, a preview of its page */}
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#3a2f25,#5a4733)] text-[#e3cb98] shadow-[0_10px_24px_-12px_rgb(58_47_37/0.8)]">
                    <Building2 className="size-5" strokeWidth={1.5} aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-[0.95rem] font-semibold text-ink">{b.label}</span>
                    <span className="mt-0.5 block text-[0.78rem] text-muted">{b.meta}</span>
                  </span>
                  <ArrowUpRight
                    className="size-4 shrink-0 text-[#8a6634] opacity-60 transition-[opacity,transform] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}
