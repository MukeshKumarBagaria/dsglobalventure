"use client";

import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { cx as cn } from "@/lib/cx";

export type AccordionItem = { q: string; a: string };

export function Accordion({ items, tone = "light" }: { items: AccordionItem[]; tone?: "light" | "dark" }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className={cn("divide-y border-y", tone === "dark" ? "divide-white/10 border-white/10" : "divide-line border-line")}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        return (
          <div key={item.q}>
            <h3 className="m-0">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className={cn(
                  "flex w-full items-center justify-between gap-6 py-6 text-left font-display text-[1.0625rem] font-semibold transition-colors",
                  tone === "dark" ? "text-white hover:text-brand-300" : "text-ink hover:text-brand-600",
                )}
              >
                <span>{item.q}</span>
                <span
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ease-(--ease-out-expo)",
                    isOpen
                      ? "rotate-45 border-brand-600 bg-brand-600 text-white"
                      : tone === "dark"
                        ? "border-white/20 text-white"
                        : "border-line text-ink",
                  )}
                >
                  <Plus className="size-4" aria-hidden />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-500 ease-(--ease-out-expo)",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                  <p className={cn("max-w-2xl pb-6 leading-relaxed", tone === "dark" ? "text-white/65" : "text-body")}>
                    {item.a}
                  </p>
                  </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
