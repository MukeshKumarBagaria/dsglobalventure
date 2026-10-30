"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cx } from "@/lib/cx";

/**
 * Accessible modal built on the native <dialog> element: focus trap, Escape to close and
 * top-layer rendering come from the browser. Locks page scroll while open.
 */
export function Modal({
  onClose,
  labelledBy,
  variant = "sheet",
  className,
  children,
}: {
  onClose: () => void;
  labelledBy: string;
  variant?: "sheet" | "full";
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const closeRef = useRef(onClose);
  useEffect(() => {
    closeRef.current = onClose;
  });

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    const onCancel = (e: Event) => {
      e.preventDefault();
      closeRef.current();
    };
    dialog.addEventListener("cancel", onCancel);
    return () => {
      dialog.removeEventListener("cancel", onCancel);
      root.style.overflow = prev;
      if (dialog.open) dialog.close();
    };
  }, []);

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      onClick={(e) => {
        // click on the backdrop (outside the panel) closes the dialog
        if (e.target === e.currentTarget) closeRef.current();
      }}
      className={cx(
        "catalog-dialog fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-body open:flex",
        variant === "full" ? "items-stretch justify-stretch" : "items-end justify-center sm:items-center sm:p-6",
        className,
      )}
      data-variant={variant}
    >
      {children}
    </dialog>
  );
}
