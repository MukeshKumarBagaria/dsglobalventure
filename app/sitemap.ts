import type { MetadataRoute } from "next";
import { products } from "@/content/products";
import { absoluteUrl } from "@/lib/site";

const lastModified = new Date("2026-10-15");

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number; changeFrequency: "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, changeFrequency: "monthly" },
    { path: "/products", priority: 0.9, changeFrequency: "monthly" },
    ...products.map((p) => ({ path: `/products/${p.slug}`, priority: 0.9, changeFrequency: "monthly" as const })),
    { path: "/products/other-chemicals", priority: 0.7, changeFrequency: "monthly" },
    { path: "/about", priority: 0.7, changeFrequency: "yearly" },
    { path: "/industries", priority: 0.8, changeFrequency: "monthly" },
    { path: "/sourcing-supply", priority: 0.8, changeFrequency: "monthly" },
    { path: "/quality", priority: 0.7, changeFrequency: "yearly" },
    { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
    { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms-and-conditions", priority: 0.2, changeFrequency: "yearly" },
    { path: "/disclaimer", priority: 0.2, changeFrequency: "yearly" },
  ];
  return pages.map((p) => ({ url: absoluteUrl(p.path), lastModified, changeFrequency: p.changeFrequency, priority: p.priority }));
}
