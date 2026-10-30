import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { productNav } from "@/content/navigation";
import { products } from "@/content/products";
import { absoluteUrl, site } from "@/lib/site";
import { jsonLd } from "@/lib/utils";

// Self-hosted variable fonts (latin subset) — no third-party font requests.
const jakarta = localFont({
  src: "./fonts/plus-jakarta-sans.woff2",
  variable: "--font-jakarta",
  weight: "200 800",
  display: "swap",
});

const dmSans = localFont({
  src: "./fonts/dm-sans.woff2",
  variable: "--font-dm-sans",
  weight: "100 1000",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/geist-mono.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});


export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "DS Global Ventures | Industrial Chemical Trading & Sourcing",
    template: "%s | DS Global Ventures",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "industrial chemical supplier",
    "chemical trading company",
    "chemical sourcing",
    "phenol supplier",
    "paraformaldehyde supplier",
    "formaldehyde supplier",
    "methanol supplier",
    "acetone supplier",
    "chemical raw materials",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: "DS Global Ventures | Industrial Chemical Trading & Sourcing",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "DS Global Ventures | Industrial Chemical Trading & Sourcing",
    description: site.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": absoluteUrl("/#organization"),
      name: site.name,
      url: site.url,
      slogan: site.tagline,
      description: site.description,
      email: site.contact.email,
      telephone: site.contact.phoneE164,
      logo: absoluteUrl("/icon.svg"),
      address: { "@type": "PostalAddress", addressCountry: "IN", streetAddress: site.contact.address },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: site.contact.phoneE164,
        email: site.contact.email,
        availableLanguage: ["English", "Hindi"],
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "09:30",
          closes: "18:30",
        },
      },
      makesOffer: products.map((p) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Product", name: p.name, url: absoluteUrl(`/products/${p.slug}`) },
      })),
    },
    {
      "@type": "WebSite",
      "@id": absoluteUrl("/#website"),
      url: site.url,
      name: site.name,
      publisher: { "@id": absoluteUrl("/#organization") },
      inLanguage: "en-IN",
    },
  ],
};

/**
 * Tiny boot script (runs before hydration): enables CSS reveal states, observes
 * [data-reveal] / [data-words] / [data-draw] elements (including streamed or
 * client-navigated content) and drives the cursor glow on .glow-card.
 */
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');
if(!('IntersectionObserver' in window)){d.classList.remove('js');return;}
var sel='[data-reveal]:not(.is-in),[data-words]:not(.is-in),[data-draw]:not(.is-in)';
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('is-in');io.unobserve(e.target);}});},{rootMargin:'0px 0px -8% 0px',threshold:0.01});
function scan(r){if(r.matches&&r.matches(sel))io.observe(r);if(r.firstElementChild&&r.querySelectorAll)r.querySelectorAll(sel).forEach(function(el){io.observe(el);});}
new MutationObserver(function(ms){ms.forEach(function(m){m.addedNodes.forEach(function(n){if(n.nodeType===1)scan(n);});});}).observe(d,{childList:true,subtree:true});
document.addEventListener('DOMContentLoaded',function(){scan(document);});
document.addEventListener('pointermove',function(e){var t=e.target;var c=t&&t.closest&&t.closest('.glow-card');if(!c)return;var b=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-b.left)+'px');c.style.setProperty('--my',(e.clientY-b.top)+'px');},{passive:true});
})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${jakarta.variable} ${dmSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-dvh bg-white">
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(organizationSchema)} />
        <a
          href="#main"
          className="fixed top-3 left-3 z-[100] -translate-y-20 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <Header productNav={productNav} />
        <main id="main">{children}</main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
