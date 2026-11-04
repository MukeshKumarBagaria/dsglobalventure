"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useRef, useState, type ReactNode } from "react";
import { cx as cn } from "@/lib/cx";

/**
 * Desktop header dropdown: opens on hover or keyboard focus, closes on leave, blur or Escape. The trigger stays a
 * real link (to the section's main page); `children` renders the panel's links, which should use `tabIndex` and
 * `close` from the render props so a closed panel isn't tabbable.
 */
export function NavDropdown({
  label,
  href,
  active,
  panelClassName,
  children,
}: {
  label: string;
  href: string;
  active: boolean;
  panelClassName?: string;
  children: (menu: { tabIndex: number | undefined; close: () => void }) => ReactNode;
}) {
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
          "flex items-center gap-1.5 rounded-full px-2 py-2 text-[0.84rem] font-medium whitespace-nowrap transition-colors 2xl:px-2.5 2xl:text-[0.875rem]",
          active ? "text-brand-700" : "text-ink/75 hover:text-ink",
        )}
      >
        {label}
        <ChevronDown className={cn("size-3.5 transition-transform duration-300", open && "rotate-180")} aria-hidden />
      </Link>

      <div
        aria-hidden={!open}
        className={cn(
          "absolute top-full right-0 pt-4 transition-[opacity,transform,visibility] duration-300 ease-(--ease-out-expo)",
          open ? "visible translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0",
          panelClassName,
        )}
      >
        <div className="rounded-3xl border border-line bg-white/95 p-3 shadow-[0_40px_80px_-30px_rgb(16_41_74/0.35)]">
          {children({ tabIndex: open ? undefined : -1, close: () => setOpen(false) })}
        </div>
      </div>
    </li>
  );
}
