import { Source_Serif_4 } from "next/font/google";
import "./construction.css";

// Display serif for DS Construction only — self-hosted at build time, variable weight with the optical-size axis so
// the headline gets the high-contrast display cut. Not preloaded: it then loads as soon as the first text renders
// instead of competing with it (the headline's mask-up entrance covers the swap), which keeps the page's mobile LCP
// in line with the rest of the site.
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-source-serif",
  display: "swap",
  preload: false,
});

/** DS Construction has its own header and footer (in the page) — none of the DS Global Ventures chrome. */
export default function ConstructionLayout({ children }: LayoutProps<"/">) {
  return <div className={`dsc ${sourceSerif.variable}`}>{children}</div>;
}
