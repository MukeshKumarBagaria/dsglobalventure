import { Img as Image } from "@/components/ui/img";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Industry } from "@/content/industries";
import { images } from "@/lib/images";

export function IndustryTile({ industry, index }: { industry: Industry; index: number }) {
  const image = images[industry.image];
  return (
    <Link
      href={`/industries#${industry.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white p-2.5 shadow-(--shadow-card) transition-[transform,box-shadow] duration-500 ease-(--ease-out-expo) hover:-translate-y-1.5 hover:shadow-(--shadow-lift)"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.15rem] bg-brand-50">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 85vw"
          className="object-cover transition-transform duration-[1.2s] ease-(--ease-out-expo) group-hover:scale-[1.07]"
        />
        <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-1 font-mono text-[0.68rem] tracking-[0.12em] text-brand-700">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="absolute right-3 bottom-3 flex size-10 scale-75 items-center justify-center rounded-full bg-white text-brand-700 opacity-0 shadow-lg transition-all duration-500 ease-(--ease-out-expo) group-hover:scale-100 group-hover:opacity-100">
          <ArrowUpRight className="size-4" aria-hidden />
        </span>
      </div>
      <div className="flex flex-1 flex-col px-3.5 pt-5 pb-4">
        <h3 className="text-lg font-bold tracking-tight transition-colors group-hover:text-brand-700">{industry.name}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed">{industry.description}</p>
        <span className="mt-4 block h-0.5 w-8 rounded-full bg-brand-500 transition-all duration-500 group-hover:w-16" aria-hidden />
      </div>
    </Link>
  );
}
