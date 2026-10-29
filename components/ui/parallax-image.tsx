import { getImageProps } from "next/image";
import { Img as Image } from "@/components/ui/img";
import type { CSSProperties } from "react";
import type { SiteImage } from "@/lib/images";
import { cn } from "@/lib/utils";

/**
 * Image that drifts vertically as its container scrolls through the viewport, using a
 * CSS scroll-driven animation (compositor-only, no JavaScript). The image is over-sized
 * so the drift never reveals edges. Browsers without support simply show a static image.
 */
export function ParallaxImage({
  image,
  className,
  imgClassName,
  strength = 12,
  sizes = "100vw",
  preload = false,
  quality = 75,
  zoom = false,
  desktopOnly = false,
}: {
  image: SiteImage;
  className?: string;
  imgClassName?: string;
  /** drift amount (≈ strength × 4px each way) */
  strength?: number;
  sizes?: string;
  preload?: boolean;
  quality?: number;
  /** slow settle-in zoom on first paint */
  zoom?: boolean;
  /**
   * Art-direct the photo to ≥1024px only (hero backgrounds that sit under a white wash on phones).
   * Phones download nothing; desktop gets the optimised srcset with high fetch priority.
   */
  desktopOnly?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden", desktopOnly ? "lg:bg-brand-50" : "bg-brand-50", className)}>
      <div className="parallax-layer absolute inset-x-0 -top-20 -bottom-20" style={{ "--px": `${Math.min(strength * 4, 72)}px` } as CSSProperties}>
        <div className={cn("absolute inset-0", zoom && "anim-zoom")}>
          {desktopOnly ? (
            <DesktopPicture image={image} sizes={sizes} quality={quality} className={cn("object-cover", imgClassName)} />
          ) : (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={sizes}
              quality={quality}
              preload={preload}
              className={cn("object-cover", imgClassName)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

const TRANSPARENT_PIXEL = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

function DesktopPicture({
  image,
  sizes,
  quality,
  className,
}: {
  image: SiteImage;
  sizes: string;
  quality: number;
  className?: string;
}) {
  const {
    props: { srcSet, sizes: imgSizes, style, alt },
  } = getImageProps({ src: image.src, alt: image.alt, fill: true, sizes, quality });
  return (
    <picture>
      <source media="(min-width: 1024px)" srcSet={srcSet} sizes={imgSizes} />
      <img src={TRANSPARENT_PIXEL} alt={alt} style={style} className={className} fetchPriority="high" decoding="async" />
    </picture>
  );
}
