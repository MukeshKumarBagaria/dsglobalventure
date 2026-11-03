import Link from "next/link";
import logo from "@/assets/images/logo.png";
import { Img } from "@/components/ui/img";
import { cx as cn } from "@/lib/cx";

/**
 * Brand lockup (mark + wordmark + tagline). assets/images/logo.png is the client's
 * "DS Global Ventures Logo.png" trimmed to the artwork, so its height is the logo's height.
 * `className` replaces the default height (width follows the 4.46:1 aspect ratio).
 */
export function LogoImage({ className = "h-10 sm:h-12", eager = false }: { className?: string; eager?: boolean }) {
  return (
    <Img
      src={logo}
      alt="DS Global Ventures"
      sizes="(min-width: 640px) 260px, 190px"
      loading={eager ? "eager" : "lazy"}
      className={cn("w-auto", className)}
    />
  );
}

export function Logo({ className, eager }: { className?: string; eager?: boolean }) {
  return (
    <Link href="/" className="flex shrink-0 items-center">
      <LogoImage className={className} eager={eager} />
    </Link>
  );
}
