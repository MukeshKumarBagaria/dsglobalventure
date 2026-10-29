import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * Card whose border glows where the cursor is (see .glow-card in globals.css).
 * The pointer position is set by one delegated listener in app/layout.tsx — no per-card JS.
 */
export function GlowCard({ className, children, ...rest }: ComponentProps<"div">) {
  return (
    <div className={cn("glow-card", className)} {...rest}>
      {children}
    </div>
  );
}
