"use client";

import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useRef } from "react";
import { constructionNav } from "@/content/construction";

/** DS Construction header: anchor links, a way back to DS Global Ventures, and a <details> menu on phones. */
export function ConstructionHeader() {
  const menu = useRef<HTMLDetailsElement>(null);

  return (
    <header className="dsc-nav">
      <div className="container-wide flex h-[76px] items-center justify-between gap-6">
        <Link href="/ds-construction" className="flex min-w-0 items-center gap-3">
          <span aria-hidden className="dsc-mark shrink-0">
            DS
          </span>
          <span className="flex min-w-0 flex-col leading-none">
            <span className="dsc-serif text-[1.4rem] whitespace-nowrap">DS Construction</span>
            <span className="dsc-sub mt-1">A DS Global Ventures company</span>
          </span>
        </Link>

        <nav aria-label="DS Construction" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {constructionNav.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="dsc-link">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-5">
          <Link href="/" className="dsc-link hidden items-center gap-1 xl:inline-flex">
            DS Global Ventures
            <ArrowUpRight aria-hidden className="size-3.5" />
          </Link>
          <a href="#contact" className="dsc-btn dsc-btn-solid h-11! px-5! max-sm:hidden!">
            Start a Project
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
