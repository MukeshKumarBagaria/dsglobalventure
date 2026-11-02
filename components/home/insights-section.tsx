import { InsightsList } from "@/components/sections/insights-list";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/section-heading";
import { posts } from "@/content/blog";

/** Latest blog articles — the last section on the home page, directly above the footer. */
export function InsightsSection() {
  return (
    <section aria-labelledby="insights-title" className="section-y bg-white">
      <div className="container-wide">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>From Our Blog</Eyebrow>
            <h2
              id="insights-title"
              className="mt-5 text-[clamp(1.875rem,3.6vw,3rem)] leading-[1.08] font-bold tracking-[-0.025em] text-brand-700"
            >
              Insights &amp; Industry Updates
            </h2>
          </div>
          <Button href="/blog" variant="outline" className="self-start md:self-auto">
            View All Articles
          </Button>
        </Reveal>
        <div className="mt-10 md:mt-14">
          <InsightsList posts={posts.slice(0, 3)} />
        </div>
      </div>
    </section>
  );
}
