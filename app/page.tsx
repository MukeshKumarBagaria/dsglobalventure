import type { Metadata } from "next";
import { CommitmentQuote } from "@/components/home/commitment-quote";
import { HomeHero } from "@/components/home/home-hero";
import {
  AboutIntro,
  CapabilityStrip,
  GlobalBand,
  IndustriesPreview,
  KeyFacts,
  ProcessSection,
  ProductsShowcase,
  ServicesBento,
} from "@/components/home/home-sections";
import { QualityHighlight } from "@/components/home/quality-highlight";
import { CtaBand } from "@/components/sections/cta-band";
import { FaqSection } from "@/components/sections/faq-section";
import { homeFaqs } from "@/content/company";

export const metadata: Metadata = {
  title: { absolute: "DS Global Ventures | Industrial Chemical Trading & Sourcing" },
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <CapabilityStrip />
      <AboutIntro />
      <KeyFacts />
      <ProductsShowcase />
      <ServicesBento />
      <IndustriesPreview />
      <ProcessSection />
      <QualityHighlight />
      <CommitmentQuote />
      <GlobalBand />
      <FaqSection items={homeFaqs} />
      <CtaBand />
    </>
  );
}
