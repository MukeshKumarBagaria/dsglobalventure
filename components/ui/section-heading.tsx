import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SplitWords } from "@/components/ui/split-words";
import { Reveal } from "@/components/ui/reveal";

export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-3 text-xs font-semibold tracking-[0.2em] uppercase",
        tone === "dark" ? "text-brand-300" : "text-brand-600",
        className,
      )}
    >
      <span aria-hidden className={cn("h-px w-6", tone === "dark" ? "bg-brand-300" : "bg-brand-500")} />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = "light",
  align = "left",
  className,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <Reveal>
          <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        </Reveal>
      ) : null}
      <Tag
        className={cn(
          "mt-5 text-[clamp(1.875rem,3.6vw,3rem)] leading-[1.08] font-bold tracking-[-0.025em]",
          tone === "dark" ? "text-white" : "text-ink",
        )}
      >
        <SplitWords text={title} />
      </Tag>
      {lead ? (
        <Reveal delay={0.15}>
          <p
            className={cn(
              "mt-5 text-lg leading-relaxed",
              tone === "dark" ? "text-white/70" : "text-body",
              align === "center" && "mx-auto max-w-2xl",
            )}
          >
            {lead}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
