"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Clock, Mail, Menu, Phone } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { BusinessesMenu } from "@/components/layout/businesses-menu";
import { Logo } from "@/components/layout/logo";
import { MegaMenu } from "@/components/layout/mega-menu";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { mainNav, type ProductMenuCategory } from "@/content/main-nav";
import { mailLink, site, telLink, whatsappLink } from "@/lib/site";
import { useScrollY } from "@/lib/use-scroll-y";
import { cx as cn } from "@/lib/cx";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Header({ productMenu, ticker }: { productMenu: ProductMenuCategory[]; ticker?: ReactNode }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);
  const productsRef = useRef<HTMLLIElement>(null);

  useScrollY((y, prev) => {
    setScrolled(y > 24);
    if (Math.abs(y - prev) > 2) setHidden(y > 480 && y > prev && !megaOpen && !mobileOpen);
  });

  // close menus on navigation
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMegaOpen(false);
    setMobileOpen(false);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMegaOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openMega = () => {
    window.clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 140);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-(--ease-out-expo)",
          hidden && "-translate-y-full",
        )}
      >
        {/* Top utility bar (desktop) */}
        <div
          className={cn(
            "hidden overflow-hidden border-b border-line bg-mist/90 backdrop-blur-md transition-[max-height,opacity] duration-500 ease-(--ease-out-expo) lg:block",
            scrolled ? "max-h-0 opacity-0" : "max-h-10 opacity-100",
          )}
        >
          <div className="container-wide flex h-9 items-center justify-between text-[0.78rem] whitespace-nowrap text-body">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <Clock className="size-3.5 text-brand-600" aria-hidden />
                {site.contact.hoursShort}
              </span>
              <a href={telLink()} className="flex items-center gap-2 transition-colors hover:text-brand-700">
                <Phone className="size-3.5 text-brand-600" aria-hidden />
                {site.contact.phoneDisplay}
              </a>
              {/* below xl the crude ticker needs the room */}
              <a href={mailLink()} className="hidden items-center gap-2 transition-colors hover:text-brand-700 xl:flex">
                <Mail className="size-3.5 text-brand-600" aria-hidden />
                {site.contact.email}
              </a>
            </div>
            <div className="flex items-center gap-5">
              {ticker}
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-brand-700"
              >
                <WhatsAppIcon className="size-3.5 text-whatsapp" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Main bar */}
        <div
          className={cn(
            "border-b transition-[background-color,border-color,backdrop-filter] duration-500",
            scrolled || megaOpen
              ? "border-line bg-white/85 shadow-[0_10px_30px_-20px_rgb(16_41_74/0.35)] backdrop-blur-xl"
              : "border-line/70 bg-white/95 backdrop-blur-md",
          )}
        >
          <div className="container-wide flex h-[72px] items-center justify-between gap-6">
            <Logo eager />

            {/* tighter padding until 2xl so labels never wrap at 1280px; stretched to the bar height so the
                products menu (positioned against the bar) opens without a hover gap */}
            <nav aria-label="Main" className="hidden self-stretch xl:block">
              <ul className="flex h-full items-center gap-1">
                {mainNav.map((item) =>
                  item.children === "businesses" ? (
                    <BusinessesMenu key={item.href} label={item.label} href={item.href} active={isActive(pathname, item.href)} />
                  ) : item.children === "products" ? (
                    <li
                      key={item.href}
                      ref={productsRef}
                      onMouseEnter={openMega}
                      onMouseLeave={scheduleClose}
                      onFocus={openMega}
                      onBlur={(e) => {
                        if (!productsRef.current?.contains(e.relatedTarget as Node)) scheduleClose();
                      }}
                      className="flex h-full items-center"
                    >
                      <Link
                        href={item.href}
                        aria-expanded={megaOpen}
                        aria-haspopup="true"
                        className={cn(
                          "flex items-center gap-1.5 rounded-full px-2.5 py-2 text-[0.875rem] font-medium whitespace-nowrap transition-colors 2xl:px-3.5",
                          isActive(pathname, item.href) ? "text-brand-700" : "text-ink/75 hover:text-ink",
                        )}
                      >
                        {item.label}
                        <ChevronDown
                          className={cn("size-3.5 transition-transform duration-300", megaOpen && "rotate-180")}
                          aria-hidden
                        />
                      </Link>
                      <MegaMenu open={megaOpen} categories={productMenu} onNavigate={() => setMegaOpen(false)} />
                    </li>
                  ) : (
                    // Home is hidden until 2xl (the logo links home) so nine items fit at 1280px
                    <li key={item.href} className={cn(item.href === "/" && "hidden 2xl:block")}>
                      <Link
                        href={item.href}
                        className={cn(
                          "relative rounded-full px-2.5 py-2 text-[0.875rem] font-medium whitespace-nowrap transition-colors 2xl:px-3.5",
                          isActive(pathname, item.href) ? "text-brand-700" : "text-ink/75 hover:text-ink",
                        )}
                      >
                        {item.label}
                        {isActive(pathname, item.href) ? (
                          <span aria-hidden className="absolute inset-x-2.5 -bottom-1.5 h-0.5 rounded-full bg-brand-600 2xl:inset-x-3.5" />
                        ) : null}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <Button href="/contact" size="sm" className="max-sm:hidden">
                Request a Quote
              </Button>
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="flex size-11 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:border-brand-500 xl:hidden"
                aria-label="Open menu"
                aria-expanded={mobileOpen}
              >
                <Menu className="size-5" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} pathname={pathname} productMenu={productMenu} />
    </>
  );
}
