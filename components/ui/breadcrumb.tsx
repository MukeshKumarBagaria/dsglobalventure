import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { absoluteUrl } from "@/lib/site";
import { jsonLd } from "@/lib/utils";

export type Crumb = { label: string; href: string };

export function Breadcrumb({ items }: { items: Crumb[] }) {
  const all = [{ label: "Home", href: "/" }, ...items];
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: absoluteUrl(c.href),
    })),
  };

  return (
    <nav aria-label="Breadcrumb">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <ol className="flex flex-wrap items-center gap-1.5 font-mono text-[0.72rem] tracking-[0.08em] text-muted uppercase">
        {all.map((c, i) => {
          const last = i === all.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="text-brand-700">
                  {c.label}
                </span>
              ) : (
                <Link href={c.href} className="transition-colors hover:text-ink">
                  {c.label}
                </Link>
              )}
              {!last ? <ChevronRight className="size-3 opacity-60" aria-hidden /> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
