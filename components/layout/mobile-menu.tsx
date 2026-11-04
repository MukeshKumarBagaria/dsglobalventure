"use client";

import Link from "next/link";
import { ChevronDown, Phone, X } from "lucide-react";
import { useEffect, useState, type CSSProperties } from "react";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { businessNav, mainNav, type ProductMenuCategory } from "@/content/main-nav";
import { site, telLink, whatsappLink } from "@/lib/site";
import { cx as cn } from "@/lib/cx";

function MenuLink({ href, label, meta, onClick }: { href: string; label: string; meta: string; onClick?: () => void }) {
  return (
    <Link href={href} onClick={onClick} className="flex items-center justify-between gap-4 py-2.5 pl-4 text-body hover:text-brand-700">
      <span>{label}</span>
      <span className="text-right font-mono text-[0.68rem] text-muted">{meta}</span>
    </Link>
  );
}

/** Products accordion: the range by category, then the catalogue and other-chemicals links. */
function ProductLinks({ categories, onNavigate }: { categories: ProductMenuCategory[]; onNavigate: () => void }) {
  // links close the menu themselves: a hash link on the current page (/products#meg) doesn't change the pathname
  return (
    <>
      <div className="space-y-4 pt-1 pb-2 pl-4">
        {categories.map((c) => (
          <div key={c.id}>
            <Link
              href={c.href}
              onClick={onNavigate}
              className="font-mono text-[0.68rem] tracking-[0.16em] text-brand-700 uppercase hover:text-brand-600"
            >
              {c.label}
            </Link>
            <ul className="mt-1 grid grid-cols-2 gap-x-4">
              {c.items.map((p) => (
                <li key={p.slug}>
                  <Link href={p.href} onClick={onNavigate} className="block py-1.5 text-body hover:text-brand-700">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <ul className="border-t border-line">
        <li>
          <MenuLink href="/product-catalog" label="Product Catalogue" meta="COA & MSDS" onClick={onNavigate} />
        </li>
        <li>
          <MenuLink href="/products/other-chemicals" label="Other Chemicals" meta="Send your requirement" onClick={onNavigate} />
        </li>
      </ul>
    </>
  );
}

export function MobileMenu({
  open,
  onClose,
  pathname,
  productMenu,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
  productMenu: ProductMenuCategory[];
}) {
  // which expandable section (Products, Our Other Businesses) is open
  const [openSection, setOpenSection] = useState<string | null>(null);
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
                            onClick={() => setOpenSection((open) => (open === item.children ? null : item.children!))}
                            aria-expanded={openSection === item.children}
                            aria-label={`Toggle ${item.label.toLowerCase()}`}
                            className="flex size-10 items-center justify-center rounded-full border border-line bg-white text-ink"
                          >
                            <ChevronDown
                              className={cn(
                                "size-4 transition-transform",
                                openSection === item.children && "rotate-180",
                              )}
                              aria-hidden
                            />
                          </button>
                        </div>
                        {(() => {
                          const isOpen = openSection === item.children;
                          return (
                            <div
                              className={cn(
                                "grid transition-[grid-template-rows] duration-400 ease-(--ease-out-expo)",
                                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                              )}
                            >
                              <div className="overflow-hidden" inert={!isOpen}>
                                {item.children === "products" ? (
                                  <ProductLinks categories={productMenu} onNavigate={onClose} />
                                ) : (
                                  <ul>
                                    {businessNav.map((p) => (
                                      <li key={p.href}>
                                        <MenuLink href={p.href} label={p.label} meta={p.meta} />
                                      </li>
                                    ))}
                                  </ul>
                                )}
                                <div className="h-3" />
                              </div>
                            </div>
                          );
                        })()}
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
