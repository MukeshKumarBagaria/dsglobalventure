"use client";

import { useEffect, useState } from "react";
import { cx as cn } from "@/lib/cx";

/** Sticky side index that highlights the industry currently in view. */
export function IndustryIndex({ items }: { items: { slug: string; name: string }[] }) {
  const [active, setActive] = useState(items[0]?.slug);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0, 0.25, 0.5] },
    );
    items.forEach((i) => {
      const el = document.getElementById(i.slug);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="Industries" className="sticky top-32">
      <p className="font-mono text-xs tracking-[0.18em] text-muted uppercase">Sectors</p>
      <ol className="mt-5 space-y-1 border-l border-line">
        {items.map((i, idx) => (
          <li key={i.slug}>
            <a
              href={`#${i.slug}`}
              className={cn(
                "-ml-px flex items-center gap-3 border-l-2 py-2 pl-4 text-sm transition-colors",
                active === i.slug ? "border-brand-500 font-semibold text-ink" : "border-transparent text-muted hover:text-ink",
              )}
            >
              <span className="font-mono text-[0.7rem]">{String(idx + 1).padStart(2, "0")}</span>
              {i.name}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
