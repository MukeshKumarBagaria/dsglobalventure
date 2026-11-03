import { Suspense, type ReactNode } from "react";
import { CrudeTicker } from "@/components/layout/crude-ticker";
import { FloatingActions } from "@/components/layout/floating-actions";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { productNav } from "@/content/navigation";

/**
 * DS Global Ventures header, footer and floating actions. Used by the (site) route group and the 404 page;
 * sister-business pages such as /ds-construction bring their own chrome.
 */
export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="fixed top-3 left-3 z-[100] -translate-y-20 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <Header
        productNav={productNav}
        ticker={
          <Suspense fallback={null}>
            <CrudeTicker />
          </Suspense>
        }
      />
      <main id="main">{children}</main>
      <Footer />
      <FloatingActions />
    </>
  );
}
