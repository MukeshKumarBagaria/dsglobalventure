import type { CSSProperties } from "react";

/** Heading words rise from a mask when scrolled into view (CSS-driven, no JS). */
export function SplitWords({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <span data-words="" className={className} style={{ "--d": `${delay}s` } as CSSProperties}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="w inline-block overflow-hidden pb-[0.08em] align-bottom">
          <span style={{ "--i": i } as CSSProperties}>{word}</span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}
