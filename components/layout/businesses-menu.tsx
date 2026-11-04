"use client";

import Link from "next/link";
import { ArrowUpRight, Building2 } from "lucide-react";
import { NavDropdown } from "@/components/layout/nav-dropdown";
import { businessNav } from "@/content/main-nav";

/** Desktop "Our Other Businesses" dropdown */
export function BusinessesMenu({ label, href, active }: { label: string; href: string; active: boolean }) {
  return (
    <NavDropdown label={label} href={href} active={active} panelClassName="w-[360px]">
      {({ tabIndex, close }) => (
        <>
          <p className="px-3 pt-2 pb-3 font-mono text-[0.68rem] tracking-[0.16em] text-muted uppercase">
            The DS Global Ventures group
          </p>
          <ul>
            {businessNav.map((b) => (
              <li key={b.href}>
                <Link
                  href={b.href}
                  tabIndex={tabIndex}
                  onClick={close}
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
        </>
      )}
    </NavDropdown>
  );
}
