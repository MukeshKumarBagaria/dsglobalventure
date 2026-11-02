import Link from "next/link";
import { cx as cn } from "@/lib/cx";

/** Typographic brand mark — replace with the client logo SVG when supplied. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn("size-10", className)} aria-hidden>
      <defs>
        <linearGradient id="dsg-mark" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5B9BF5" />
          <stop offset="1" stopColor="#174EAD" />
        </linearGradient>
      </defs>
      <path d="M20 2.5 35.2 11.25v17.5L20 37.5 4.8 28.75v-17.5L20 2.5Z" fill="url(#dsg-mark)" />
      <path d="M20 8.6 29.9 14.3v11.4L20 31.4l-9.9-5.7V14.3L20 8.6Z" fill="none" stroke="#ffffff" strokeOpacity=".35" strokeWidth="1.2" />
      <text
        x="20"
        y="20.8"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="var(--font-display)"
        fontWeight="800"
        fontSize="11.5"
        letterSpacing="-0.4"
        fill="#ffffff"
      >
        DS
      </text>
    </svg>
  );
}

export function Logo({ tone = "light", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <Link href="/" className={cn("group flex min-w-0 items-center gap-2.5 sm:gap-3", className)}>
      <LogoMark className="size-9 shrink-0 sm:size-10 transition-transform duration-700 ease-(--ease-out-expo) group-hover:rotate-[60deg]" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[0.88rem] font-bold tracking-[0.04em] whitespace-nowrap min-[400px]:text-[0.98rem] min-[400px]:tracking-[0.06em]",
            tone === "dark" ? "text-white" : "text-ink",
          )}
        >
          DS GLOBAL VENTURES
        </span>
        <span
          className={cn(
            "mt-1 text-[0.56rem] font-medium tracking-[0.14em] whitespace-nowrap uppercase min-[400px]:text-[0.62rem] min-[400px]:tracking-[0.22em]",
            tone === "dark" ? "text-brand-300/90" : "text-brand-600",
          )}
        >
          Chemical Trading &amp; Sourcing
        </span>
      </span>
    </Link>
  );
}
