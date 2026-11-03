import { Cormorant_Garamond } from "next/font/google";
import "./construction.css";

// Display serif for DS Construction only — self-hosted at build time. Not preloaded: it then loads as soon as the
// first text renders instead of competing with it (the headline's mask-up entrance covers the swap), which keeps
// the page's mobile LCP in line with the rest of the site.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: "500",
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
  preload: false,
});

/** DS Construction has its own header and footer (in the page) — none of the DS Global Ventures chrome. */
export default function ConstructionLayout({ children }: LayoutProps<"/">) {
  return <div className={`dsc ${cormorant.variable}`}>{children}</div>;
}
