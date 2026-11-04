import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/layout/logo";

export const metadata: Metadata = {
  title: { absolute: "Admin | DS Global Ventures" },
  robots: { index: false, follow: false },
};

/** Private admin area — kept out of search engines and without the public site's header and footer. */
export default function AdminLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="min-h-dvh bg-mist">
      <header className="border-b border-line bg-white">
        <div className="container-wide flex h-16 items-center justify-between gap-4">
          <Logo />
          <Link href="/chemical-prices" className="text-sm font-semibold text-brand-700 hover:text-brand-600">
            View public prices page ↗
          </Link>
        </div>
      </header>
      <main id="main">{children}</main>
    </div>
  );
}
