import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/cta-band";
import { InsightsList } from "@/components/sections/insights-list";
import { PageHero } from "@/components/sections/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { posts } from "@/content/blog";
import { images } from "@/lib/images";
import { absoluteUrl, site } from "@/lib/site";
import { jsonLd } from "@/lib/utils";

const description =
  "Practical guides on industrial chemicals — resin raw materials, certificates of analysis, packaging and buying — from DS Global Ventures.";

export const metadata: Metadata = {
  title: "Blog — Insights & Industry Updates",
  description,
  alternates: { canonical: "/blog" },
  openGraph: { title: `Insights & Industry Updates | ${site.name}`, description },
};

export default function BlogPage() {
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${site.name} — Insights & Industry Updates`,
    description,
    url: absoluteUrl("/blog"),
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: absoluteUrl(`/blog/${p.slug}`),
      datePublished: p.published,
    })),
  };

  return (
    <>
      <PageHero
        image={images.complex}
        crumbs={[{ label: "Blog", href: "/blog" }]}
        eyebrow="Blog"
        title="Insights & Industry Updates"
        lead="Practical notes on the industrial chemicals we deal in — how they are used, what to check on the paperwork, and how to buy and receive them well."
        compact
      />

      <section className="section-y bg-white">
        <div className="container-wide">
          <Reveal className="flex items-center gap-5 md:gap-8">
            <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-transparent to-line" />
            <h2 className="text-center text-[clamp(1.5rem,2.6vw,2.1rem)] leading-tight font-bold tracking-[-0.02em]">
              Latest Articles
            </h2>
            <span aria-hidden className="h-px flex-1 bg-gradient-to-l from-transparent to-line" />
          </Reveal>
          <div className="mt-12 md:mt-16">
            <InsightsList posts={posts} />
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Talk to Us"
        title="Have a Question About a Chemical?"
        text="Ask about grades, documents, packaging or availability for Phenol, Paraformaldehyde, Formaldehyde, Methanol, Acetone and other industrial chemicals."
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(blogSchema)} />
    </>
  );
}
