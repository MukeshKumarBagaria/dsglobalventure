"use client";

import Link from "next/link";
import { ArrowUpRight, LineChart, Newspaper } from "lucide-react";
import { NavDropdown } from "@/components/layout/nav-dropdown";
import { insightsNav } from "@/content/main-nav";

const icons = { prices: LineChart, blog: Newspaper };

/** Desktop "Insights" dropdown — daily chemical prices and the blog */
export function InsightsMenu({ label, href, active }: { label: string; href: string; active: boolean }) {
  return (
    <NavDropdown label={label} href={href} active={active} panelClassName="w-[340px]">
      {({ tabIndex, close }) => (
        <ul>
          {insightsNav.map((item) => {
            const Icon = icons[item.icon];
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  tabIndex={tabIndex}
                  onClick={close}
                  className="group flex items-center gap-4 rounded-2xl p-3 transition-colors hover:bg-mist"
                >
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-line bg-mist text-brand-600 transition-colors group-hover:border-brand-500/40 group-hover:bg-brandwash">
                    <Icon className="size-5" strokeWidth={1.5} aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-[0.95rem] font-semibold text-ink">{item.label}</span>
                    <span className="mt-0.5 block text-[0.78rem] text-muted">{item.meta}</span>
                  </span>
                  <ArrowUpRight
                    className="size-4 shrink-0 text-brand-600 opacity-60 transition-[opacity,transform] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    aria-hidden
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </NavDropdown>
  );
}
