import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { RevealItem } from "@/components/ui/reveal";
import { formatPostDate, readingMinutes, type BlogPost } from "@/content/blog";
import { bgPhotoVars } from "@/lib/bg-photo";

/**
 * Numbered article rows. On large hover-capable screens the article photo fades in behind a row on hover/focus
 * (`.insight-photo` in globals.css loads it only once the row is revealed); elsewhere rows stay plain text, so
 * every hover colour change is scoped to `lg:` to match.
 */
export function InsightsList({ posts }: { posts: BlogPost[] }) {
  return (
    <ol className="border-t border-line">
      {posts.map((post, i) => (
        <RevealItem as="li" key={post.slug} className="border-b border-line">
          <Link
            href={`/blog/${post.slug}`}
            className="group relative isolate grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-5 gap-y-4 overflow-hidden py-8 sm:gap-x-8 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-x-12 lg:rounded-[1.75rem] lg:px-10 lg:py-12"
          >
            <span
              aria-hidden
              className="insight-photo absolute inset-0 -z-20 scale-[1.04] opacity-0 transition-[opacity,transform] duration-700 ease-(--ease-out-expo) lg:group-hover:scale-100 lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100"
              style={bgPhotoVars(post.image, 1200, 2048)}
            />
            <span
              aria-hidden
              className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(8_30_70/0.88)_0%,rgb(8_30_70/0.7)_55%,rgb(8_30_70/0.5)_100%)] opacity-0 transition-opacity duration-500 lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100"
            />

            <span className="flex size-12 shrink-0 items-center justify-center self-start rounded-full border border-line font-mono text-sm text-ink transition-colors duration-500 sm:size-14 lg:self-center lg:group-hover:border-white/70 lg:group-hover:text-white">
              {String(i + 1).padStart(2, "0")}
            </span>

            <div className="min-w-0">
              <p className="font-mono text-[0.7rem] tracking-[0.14em] text-brand-600 uppercase transition-colors duration-500 lg:group-hover:text-brand-200">
                {post.category} · <time dateTime={post.published}>{formatPostDate(post.published)}</time> ·{" "}
                {readingMinutes(post)} min read
              </p>
              <h3 className="mt-3 text-[clamp(1.3rem,2.3vw,2rem)] leading-[1.18] font-semibold tracking-[-0.015em] text-ink transition-colors duration-500 lg:group-hover:text-white">
                {post.title}
              </h3>
              <p className="mt-3 line-clamp-2 max-w-3xl text-[0.97rem] leading-relaxed text-body transition-colors duration-500 lg:group-hover:text-white/85">
                {post.excerpt}
              </p>
            </div>

            <span className="col-start-2 inline-flex w-fit items-center gap-1.5 border-b-2 border-transparent pb-1 text-sm font-semibold text-brand-700 transition-colors duration-500 lg:col-start-3 lg:text-ink lg:group-hover:border-white lg:group-hover:text-white">
              Read More
              <ArrowUpRight aria-hidden className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>
        </RevealItem>
      ))}
    </ol>
  );
}
