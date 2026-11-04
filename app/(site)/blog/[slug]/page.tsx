import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ArticleBody } from "@/components/blog/article-body";
import { CtaBand } from "@/components/sections/cta-band";
import { InsightsList } from "@/components/sections/insights-list";
import { BreadcrumbSchema } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Img as Image } from "@/components/ui/img";
import { Eyebrow } from "@/components/ui/section-heading";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { formatPostDate, getPost, posts, readingMinutes } from "@/content/blog";
import { getProduct, type Product } from "@/content/products";
import { images } from "@/lib/images";
import { absoluteUrl, site, whatsappLink } from "@/lib/site";
import { jsonLd } from "@/lib/utils";

const d = (delay: number) => ({ "--d": `${delay}s` }) as CSSProperties;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.seoTitle,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.published,
      url: absoluteUrl(`/blog/${post.slug}`),
      images: [{ url: absoluteUrl(images[post.image].src.src), width: images[post.image].src.width, height: images[post.image].src.height, alt: images[post.image].alt }],
    },
  };
}

// Every article is fully prerendered from generateStaticParams; render it in one pass (as product pages do).
export const instant = false;

export default async function ArticlePage({ params }: PageProps<"/blog/[slug]">) {
  return <Article params={params} />;
}

async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const image = images[post.image];
  const discussed = post.products.map(getProduct).filter((p): p is Product => Boolean(p));
  const more = posts.filter((p) => p.slug !== post.slug);
  const url = absoluteUrl(`/blog/${post.slug}`);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: absoluteUrl(image.src.src),
    datePublished: post.published,
    dateModified: post.published,
    articleSection: post.category,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
  };

  return (
    <>
      <section data-hero="" className="surface-soft relative overflow-hidden">
        <div aria-hidden className="bg-grid-light absolute inset-0 opacity-70 [mask-image:linear-gradient(180deg,black,transparent_85%)]" />
        <div className="container-x relative pt-36 pb-14 lg:pt-44">
          <BreadcrumbSchema
            items={[
              { label: "Blog", href: "/blog" },
              { label: post.title, href: `/blog/${post.slug}` },
            ]}
          />
          <Link
            href="/blog"
            className="anim-rise inline-flex items-center gap-2 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-600"
            style={d(0.02)}
          >
            <ArrowLeft aria-hidden className="size-4" />
            All articles
          </Link>
          <div className="anim-rise mt-8" style={d(0.06)}>
            <Eyebrow>{post.category}</Eyebrow>
          </div>
          <h1
            className="anim-rise mt-5 max-w-4xl text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.08] font-bold tracking-[-0.03em] text-ink"
            style={d(0.1)}
          >
            {post.title}
          </h1>
          <p className="anim-rise mt-6 max-w-3xl text-lg leading-relaxed text-body" style={d(0.16)}>
            {post.excerpt}
          </p>
          <p className="anim-rise mt-8 font-mono text-xs tracking-[0.14em] text-muted uppercase" style={d(0.2)}>
            {site.name} · <time dateTime={post.published}>{formatPostDate(post.published)}</time> · {readingMinutes(post)}{" "}
            min read
          </p>

          <Image
            src={image.src}
            alt={image.alt}
            preload
            quality={70}
            sizes="(min-width: 1280px) 1216px, 100vw"
            // not animated: it is the page's LCP element, so it should paint as soon as it loads
            className="mt-12 aspect-[16/10] w-full rounded-[1.75rem] object-cover shadow-(--shadow-lift) sm:aspect-[21/9] lg:rounded-[2rem]"
          />
        </div>
      </section>

      <section className="bg-white pt-6 pb-20 md:pb-28">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* min-w-0: lets a wide table scroll inside its box instead of stretching the grid column on phones */}
          <article className="min-w-0 lg:col-span-8">
            <ArticleBody blocks={post.body} />
          </article>

          <aside className="lg:col-span-4">
            <div className="space-y-5 lg:sticky lg:top-28">
              <div className="rounded-3xl border border-line bg-mist p-6">
                <h2 className="font-mono text-xs font-semibold tracking-[0.16em] text-brand-700 uppercase">Products in this article</h2>
                <ul className="mt-4 divide-y divide-line">
                  {discussed.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/products/${p.slug}`}
                        className="group flex items-center justify-between gap-4 py-3 transition-colors hover:text-brand-700"
                      >
                        <span>
                          <span className="block font-semibold text-ink group-hover:text-brand-700">{p.name}</span>
                          <span className="font-mono text-xs text-muted">CAS {p.cas}</span>
                        </span>
                        <ArrowUpRight aria-hidden className="size-4 shrink-0 text-brand-600" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="surface-blue rounded-3xl border border-brand-500/15 p-6">
                <h2 className="text-lg font-bold tracking-tight text-ink">Have a requirement?</h2>
                <p className="mt-2 text-[0.95rem] leading-relaxed">
                  Share the product, grade, quantity and delivery location — we’ll come back with options.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button href="/contact" size="sm">
                    Request a Quote
                  </Button>
                  <Button
                    href={whatsappLink(`Hello DS Global Ventures, I read “${post.title}” and have a requirement.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="glass"
                    size="sm"
                    arrow={false}
                    icon={<WhatsAppIcon className="size-4 text-whatsapp" />}
                  >
                    WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section-y border-t border-line bg-white">
        <div className="container-wide">
          <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] leading-tight font-bold tracking-[-0.02em] text-brand-700">More Insights</h2>
          <div className="mt-10">
            <InsightsList posts={more} />
          </div>
        </div>
      </section>

      <CtaBand />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(articleSchema)} />
    </>
  );
}
