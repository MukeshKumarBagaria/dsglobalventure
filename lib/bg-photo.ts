import type { CSSProperties } from "react";
import { getImageProps } from "next/image";
import { images, type ImageKey } from "@/lib/images";

/**
 * Optimised URLs for a photo used as a CSS background, as `--photo-sm` / `--photo-lg` custom properties.
 * Pages apply them only once the element is revealed (`.is-in`), so photos near the fold aren't fetched during
 * page load the way a lazy <img> would be. Widths must be in Next's image sizes (e.g. 640, 1080, 1200, 2048).
 */
export function bgPhotoVars(key: ImageKey, sm: number, lg: number) {
  const { srcSet = "" } = getImageProps({ src: images[key].src, alt: "", fill: true, sizes: "100vw", quality: 70 }).props;
  const at = (w: number) => srcSet.split(", ").find((s) => s.endsWith(` ${w}w`))?.split(" ")[0];
  return { "--photo-sm": `url(${at(sm)})`, "--photo-lg": `url(${at(lg)})` } as CSSProperties;
}
