import type { CSSProperties, ReactNode } from "react";
import { BreadcrumbSchema, type Crumb } from "@/components/ui/breadcrumb";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { Eyebrow } from "@/components/ui/section-heading";
import type { SiteImage } from "@/lib/images";
import { cn } from "@/lib/utils";

const d = (delay: number) => ({ "--d": `${delay}s` }) as CSSProperties;

/** Light, airy page hero: photo fades into white behind the copy. */
export function PageHero({
  image,
  crumbs,
  eyebrow,
  title,
  lead,
  children,
  aside,
  compact = false,
}: {
  image: SiteImage;
  crumbs: Crumb[];
  eyebrow: string;
  title: string;
  lead?: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
  compact?: boolean;
}) {
  return (
    <section data-hero="" className="surface-soft relative isolate overflow-hidden">
      <ParallaxImage
        image={image}
        className="absolute inset-y-0 right-0 -z-20 w-full lg:w-[68%]"
        strength={10}
        zoom
        desktopOnly
        quality={70}
        sizes="68vw"
      />
      {/* white wash so the copy always sits on a light surface */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,#ffffff,transparent_8rem),linear-gradient(90deg,#f7faff_0%,#f7faff_33%,rgb(247_250_255/0.88)_42%,rgb(247_250_255/0.55)_62%,rgb(247_250_255/0.12)_100%)] max-lg:bg-[linear-gradient(to_top,#ffffff,transparent_8rem),linear-gradient(180deg,rgb(247_250_255/0.88)_0%,rgb(247_250_255/0.94)_60%,#f7faff_100%)]"
      />
      <div aria-hidden className="bg-grid-light absolute inset-0 -z-10 opacity-60 [mask-image:linear-gradient(90deg,black,transparent_60%)]" />
      <div aria-hidden className="absolute -top-32 -left-32 -z-10 size-[520px] rounded-full bg-[radial-gradient(closest-side,rgb(91_155_245/0.20),transparent)]" />

      <div
        className={cn(
          "container-wide grid items-end gap-12 pt-40 pb-16 lg:grid-cols-12 lg:pt-48",
          compact ? "lg:min-h-[58vh] lg:pb-20" : "lg:min-h-[72vh] lg:pb-24",
        )}
      >
        <div className={cn(aside ? "lg:col-span-7" : "lg:col-span-8")}>
          <BreadcrumbSchema items={crumbs} />
          <div className="anim-rise" style={d(0.05)}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
          <h1 className="mt-5 text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.04] font-bold tracking-[-0.03em] text-ink">
            {title.split(" ").map((word, i, all) => (
              <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <span className="anim-mask" style={d(0.08 + i * 0.045)}>
                  {word}
                </span>
                {i < all.length - 1 ? "\u00A0" : null}
              </span>
            ))}
          </h1>
          {lead ? (
            <div className="anim-lift mt-6 max-w-2xl text-lg leading-relaxed text-body" style={d(0.2)}>
              {lead}
            </div>
          ) : null}
          {children ? (
            <div className="anim-rise mt-9 flex flex-wrap gap-3" style={d(0.35)}>
              {children}
            </div>
          ) : null}
        </div>
        {aside ? (
          <div className="anim-rise lg:col-span-5" style={d(0.3)}>
            {aside}
          </div>
        ) : null}
      </div>
    </section>
  );
}
