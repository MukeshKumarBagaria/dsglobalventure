import type { CSSProperties, ReactNode } from "react";

/*
 * Scroll reveals are pure CSS + one shared IntersectionObserver (see app/layout.tsx and
 * globals.css "Scroll reveal system"). These are server components — they ship no JS.
 */

type Tag = "div" | "li" | "section" | "span" | "article" | "ul" | "ol";

function style(delay?: number, y?: number): CSSProperties | undefined {
  if (delay === undefined && y === undefined) return undefined;
  return {
    ...(delay !== undefined ? { "--d": `${delay}s` } : {}),
    ...(y !== undefined ? { "--ry": `${y}px` } : {}),
  } as CSSProperties;
}

/** Fade + rise when scrolled into view. */
export function Reveal({
  children,
  delay,
  y,
  className,
  as: Component = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: Tag;
}) {
  return (
    <Component data-reveal="" className={className} style={style(delay, y)}>
      {children}
    </Component>
  );
}

/** Container whose <RevealItem> children reveal with a CSS stagger. */
export function RevealGroup({
  children,
  className,
  as: Component = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "ul" | "ol";
}) {
  return (
    <Component data-stagger="" className={className}>
      {children}
    </Component>
  );
}

export function RevealItem({
  children,
  className,
  as: Component = "div",
  y,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
  y?: number;
}) {
  return (
    <Component data-reveal="" className={className} style={style(undefined, y)}>
      {children}
    </Component>
  );
}
