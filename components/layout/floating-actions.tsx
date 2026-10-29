"use client";

import Link from "next/link";
import { FileText, Phone } from "lucide-react";
import { useState } from "react";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { telLink, whatsappLink } from "@/lib/site";
import { useScrollY } from "@/lib/use-scroll-y";
import { cx as cn } from "@/lib/cx";

/** Scroll progress bar, floating WhatsApp (md+) and mobile action bar. */
export function FloatingActions() {
  const [visible, setVisible] = useState(false);
  useScrollY((y) => setVisible(y > window.innerHeight * 0.6));

  return (
    <>
      <div aria-hidden className="scroll-progress fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-gradient-to-r from-brand-300 via-brand-400 to-brand-200" />

      {/* Desktop / tablet WhatsApp */}
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="group fixed right-6 bottom-6 z-40 hidden md:block"
      >
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-whatsapp" aria-hidden />
        <span className="relative flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_18px_40px_-12px_rgb(37_211_102/0.7)] transition-transform duration-300 group-hover:scale-105">
          <WhatsAppIcon className="size-7" />
        </span>
        <span className="pointer-events-none absolute top-1/2 right-[calc(100%+12px)] -translate-y-1/2 translate-x-2 rounded-full border border-line bg-white px-4 py-2 text-xs font-medium whitespace-nowrap text-ink opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          Chat with us on WhatsApp
        </span>
      </a>

      {/* Mobile action bar */}
      <nav
        aria-label="Quick actions"
        inert={!visible}
        className={cn(
          "fixed inset-x-3 bottom-3 z-40 grid grid-cols-3 gap-1 rounded-2xl border border-line bg-white/92 p-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))] shadow-[0_20px_50px_-15px_rgb(16_41_74/0.4)] backdrop-blur-xl md:hidden transition-transform duration-500 ease-(--ease-out-expo)",
          visible ? "translate-y-0" : "translate-y-[130%]",
        )}
      >
            <a href={telLink()} className="flex flex-col items-center gap-1 rounded-xl py-2 text-[0.7rem] font-medium text-ink">
              <Phone className="size-4 text-brand-600" aria-hidden />
              Call
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 rounded-xl py-2 text-[0.7rem] font-medium text-ink"
            >
              <WhatsAppIcon className="size-4 text-whatsapp" />
              WhatsApp
            </a>
            <Link
              href="/contact"
              className="flex flex-col items-center gap-1 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 py-2 text-[0.7rem] font-semibold text-white"
            >
              <FileText className="size-4" aria-hidden />
              Get Quote
            </Link>
          </nav>
    </>
  );
}
