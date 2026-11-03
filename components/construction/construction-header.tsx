"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { useRef } from "react";
import { SectorIcon } from "@/components/construction/sector-icon";
import { constructionNav, sectors } from "@/content/construction";

/** DS Construction header: anchor links (Sectors opens a menu of the three sectors), a way back to DS Global
 *  Ventures, and a <details> menu on phones. */
export function ConstructionHeader() {
  const menu = useRef<HTMLDetailsElement>(null);

  return (
    <header className="dsc-nav">
      <div className="container-wide flex h-[76px] items-center justify-between gap-6">
        <div className="flex min-w-0 items-center gap-10">
          <Link href="/ds-construction" className="flex min-w-0 items-center gap-3">
            <span aria-hidden className="dsc-mark shrink-0">
              DS
            </span>
            <span className="flex min-w-0 flex-col leading-none">
              <span className="dsc-serif text-[1.4rem] whitespace-nowrap text-white!">DS Construction</span>
              <span className="dsc-sub mt-1">A DS Global Ventures company</span>
            </span>
          </Link>

          <nav aria-label="DS Construction" className="hidden border-l border-white/12 pl-10 lg:block">
            <ul className="flex items-center gap-8">
              {constructionNav.map((l) =>
                l.href === "#sectors" ? (
                  <li key={l.href} className="dsc-drop">
                    <a href={l.href} className="dsc-link inline-flex items-center gap-1.5">
                      {l.label}
                      <ChevronDown aria-hidden className="dsc-drop-chev size-3.5" />
                    </a>
                    {/* opens on hover and keyboard focus; a chosen link drops focus so the panel closes behind it */}
                    <div
                      className="dsc-drop-panel"
                      onClick={(e) => {
                        if ((e.target as HTMLElement).closest("a")) (document.activeElement as HTMLElement | null)?.blur();
                      }}
                    >
                      <ul>
                        {sectors.map((s) => (
                          <li key={s.id}>
                            <a href={`#sector-${s.id}`}>
                              <SectorIcon kind={s.icon} className="size-6 shrink-0 text-[var(--dsc-gold)]" strokeWidth={2.6} />
                              {s.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ) : (
                  <li key={l.href}>
                    <a href={l.href} className="dsc-link">
                      {l.label}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/" className="dsc-link hidden items-center gap-1 xl:inline-flex">
            DS Global Ventures
            <ArrowUpRight aria-hidden className="size-3.5 text-[var(--dsc-gold)]" />
          </Link>
          <a href="#contact" className="dsc-btn dsc-btn-solid h-11! px-5! max-sm:hidden!">
            Start a Project
            <ArrowRight aria-hidden />
          </a>
          <details ref={menu} className="dsc-menu lg:hidden">
            <summary className="dsc-burger grid size-11 place-items-center">
              <Menu aria-hidden className="dsc-burger-open size-5" />
              <X aria-hidden className="dsc-burger-close size-5" />
              <span className="sr-only">Menu</span>
            </summary>
            {/* close after a link is chosen, so the panel doesn't cover the section it scrolled to */}
            <div
              className="dsc-menu-panel"
              onClick={(e) => {
                if ((e.target as HTMLElement).closest("a") && menu.current) menu.current.open = false;
              }}
            >
              <ul className="container-wide py-4">
                {constructionNav.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="dsc-menu-link">
                      {l.label}
                    </a>
                  </li>
                ))}
                <li>
                  <Link href="/" className="dsc-menu-link">
                    DS Global Ventures ↗
                  </Link>
                </li>
              </ul>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
