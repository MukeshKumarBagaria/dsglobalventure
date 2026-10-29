import { getImageProps, type ImageProps } from "next/image";

/**
 * Server-rendered optimised image. Same output as next/image (srcset, sizes, lazy loading,
 * AVIF/WebP) via getImageProps, but it is a plain <img>, so it adds nothing to hydration.
 */
export function Img({
  className,
  preload,
  alt,
  ...props
}: Omit<ImageProps, "placeholder" | "onLoad" | "onError"> & { preload?: boolean }) {
  const { props: imgProps } = getImageProps({
    ...props,
    alt,
    ...(preload ? { loading: "eager" as const, fetchPriority: "high" as const } : {}),
  });
  // eslint-disable-next-line @next/next/no-img-element -- optimised via getImageProps (srcset/AVIF)
  return <img {...imgProps} alt={alt} className={className} />;
}
