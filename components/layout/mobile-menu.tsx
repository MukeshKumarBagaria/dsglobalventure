"use client";

import Link from "next/link";
import { ChevronDown, Phone, X } from "lucide-react";
import { useEffect, useState, type CSSProperties } from "react";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { mainNav, type ProductNavItem } from "@/content/main-nav";
import { site, telLink, whatsappLink } from "@/lib/site";
import { cx as cn } from "@/lib/cx";

export function MobileMenu({
  open,
  onClose,
  pathname,
  productNav,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
  productNav: ProductNavItem[];
}) {
  const [productsOpen, setProductsOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="anim-menu-in surface-soft fixed inset-0 z-[60] flex flex-col overflow-y-auto xl:hidden"
        >
          <div className="bg-grid-light pointer-events-none absolute inset-0 opacity-60" aria-hidden />
          <div className="relative flex h-[72px] shrink-0 items-center justify-between px-4 sm:px-6">
            <Logo />
            <button
              type="button"
              onClick={onClose}
              className="flex size-11 items-center justify-center rounded-full border border-line bg-white text-ink"
              aria-label="Close menu"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>

          <nav aria-label="Mobile" className="relative flex-1 px-4 pt-6 sm:px-6">
            <ul className="space-y-1">
              {mainNav.map((item, i) => {
                const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <li
                    key={item.href}
                    style={{ "--d": `${0.15 + i * 0.05}s` } as CSSProperties}
                    className="anim-rise border-b border-line"
                  >
                    {item.children ? (
                      <>
                        <div className="flex items-center justify-between">
                          <Link
                            href={item.href}
                            className={cn(
                              "block py-4 font-display text-2xl font-semibold",
                              active ? "text-brand-700" : "text-ink",
                            )}
                          >
                            {item.label}
                          </Link>
                          <button
                            type="button"
                            onClick={() => setProductsOpen((v) => !v)}
                            aria-expanded={productsOpen}
                            aria-label="Toggle products"
                            className="flex size-10 items-center justify-center rounded-full border border-line bg-white text-ink"
                          >
                            <ChevronDown className={cn("size-4 transition-transform", productsOpen && "rotate-180")} aria-hidden />
                          </button>
                        </div>
                        <div
                          className={cn(
                            "grid transition-[grid-template-rows] duration-400 ease-(--ease-out-expo)",
                            productsOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                          )}
                        >
                            <ul className="overflow-hidden" inert={!productsOpen}>
                              {productNav.map((p) => (
                                <li key={p.href}>
                                  <Link
                                    href={p.href}
                                    className="flex items-center justify-between py-2.5 pl-4 text-body hover:text-brand-700"
                                  >
                                    <span>{p.label}</span>
                                    <span className="font-mono text-[0.68rem] text-muted">{p.meta}</span>
                                  </Link>
                                </li>
                              ))}
                              <li className="h-3" />
                            </ul>
                        </div>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className={cn(
                          "block py-4 font-display text-2xl font-semibold",
                          active ? "text-brand-700" : "text-ink",
                        )}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="anim-rise relative space-y-3 px-4 pt-8 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-6" style={{ "--d": "0.5s" } as CSSProperties}>
            <Button href="/contact" size="lg" className="w-full">
              Request a Quote
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Button href={telLink()} variant="glass" icon={<Phone className="size-4" />}>
                Call Now
              </Button>
              <Button href={whatsappLink()} variant="whatsapp" icon={<WhatsAppIcon className="size-4" />}>
                WhatsApp
              </Button>
            </div>
            <p className="pt-2 text-center font-mono text-xs text-muted">{site.contact.hoursShort}</p>
          </div>
        </div>
  );
}
