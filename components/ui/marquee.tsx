import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Infinite CSS marquee. Content is duplicated once; pauses on hover. */
export function Marquee({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("group/marquee mask-fade-x relative flex overflow-hidden", className)}>
      <div className="flex w-max shrink-0 animate-marquee items-center group-hover/marquee:[animation-play-state:paused]">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
