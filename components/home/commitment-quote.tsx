import type { CSSProperties } from "react";
import { Eyebrow } from "@/components/ui/section-heading";
import { commitmentQuote } from "@/content/company";

const accents = new Set(["reliability,", "communication,", "specifications,", "documentation", "execution."]);

/** Words brighten one by one as the section scrolls (CSS scroll-driven animation, no JS). */
export function CommitmentQuote() {
  const words = commitmentQuote.split(" ");
  return (
    <section className="section-y bg-white">
      <div className="quote-track container-x max-w-5xl text-center">
        <Eyebrow className="justify-center">Our Commitment</Eyebrow>
        <blockquote className="mt-8">
          <p className="font-display text-[clamp(1.75rem,3.8vw,3.25rem)] leading-[1.2] font-semibold tracking-[-0.02em] text-ink">
            <span className="text-brand-500">“</span>
            {words.map((w, i) => (
              <span
                key={`${w}-${i}`}
                className="quote-word"
                style={{ "--i": i, "--to": accents.has(w) ? "#1e63d6" : "#0f2a4f" } as CSSProperties}
              >
                {w}{" "}
              </span>
            ))}
            <span className="text-brand-500">”</span>
          </p>
          <footer className="mt-8 font-mono text-xs tracking-[0.18em] text-muted uppercase">
            — Our Commitment, DS Global Ventures
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
