import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/section-heading";
import { SplitWords } from "@/components/ui/split-words";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { images, type SiteImage } from "@/lib/images";
import { telLink, whatsappLink } from "@/lib/site";

export function CtaBand({
  eyebrow = "Request a Quote",
  title = "Let’s Discuss Your Chemical Requirement",
  text = "Looking for Phenol, Paraformaldehyde or another industrial chemical? Send us your requirement and our team will get in touch with you.",
  primaryLabel = "Request a Quote",
  primaryHref = "/contact",
  image = images.storageTanks,
}: {
  eyebrow?: string;
  title?: string;
  text?: string;
  primaryLabel?: string;
  primaryHref?: string;
  image?: SiteImage;
}) {
  return (
    <section className="bg-white px-3 py-3 sm:px-4 sm:py-4">
      <div className="surface-blue relative isolate overflow-hidden rounded-[2rem] border border-brand-500/15">
        <ParallaxImage
          image={image}
          className="absolute inset-y-0 right-0 -z-20 hidden w-[48%] [mask-image:linear-gradient(90deg,transparent,black_45%)] lg:block"
          strength={12}
          sizes="45vw"
        />
        <div aria-hidden className="bg-grid-light absolute inset-0 -z-10 opacity-70 [mask-image:linear-gradient(90deg,black,transparent_70%)]" />
        <div aria-hidden className="absolute -top-40 -left-20 -z-10 size-[480px] rounded-full bg-[radial-gradient(closest-side,rgb(91_155_245/0.30),transparent)]" />

        <div className="container-wide grid gap-10 py-20 md:py-24 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>{eyebrow}</Eyebrow>
            </Reveal>
            <h2 className="mt-5 text-[clamp(2rem,4.2vw,3.5rem)] leading-[1.06] font-bold tracking-[-0.03em]">
              <SplitWords text={title} />
            </h2>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed">{text}</p>
            </Reveal>
            <Reveal delay={0.25} className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href={primaryHref} size="lg">
                {primaryLabel}
              </Button>
              <Button href={telLink()} variant="white" size="lg" arrow={false} icon={<Phone className="size-4 text-brand-700" />}>
                Call Now
              </Button>
              <Button href={whatsappLink()} variant="white" size="lg" arrow={false} icon={<WhatsAppIcon className="size-4 text-whatsapp" />}>
                WhatsApp Us
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
