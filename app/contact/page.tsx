import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { PageHero } from "@/components/sections/page-hero";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/section-heading";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { images } from "@/lib/images";
import { mailLink, site, telLink, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us | Request a Quote",
  description:
    "Send your chemical requirement to DS Global Ventures — product, quantity and delivery location — and our team will get in touch.",
  alternates: { canonical: "/contact" },
};

const details = [
  { icon: Phone, label: "Phone", value: site.contact.phoneDisplay, href: telLink() },
  { icon: Mail, label: "Email", value: site.contact.email, href: mailLink() },
  { icon: WhatsAppIcon, label: "WhatsApp", value: site.contact.whatsappDisplay, href: whatsappLink() },
  { icon: MapPin, label: "Address", value: site.contact.address },
  { icon: Clock, label: "Business Hours", value: site.contact.hours },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        compact
        image={images.warehouse}
        crumbs={[{ label: "Contact", href: "/contact" }]}
        eyebrow="Contact DS Global Ventures"
        title="Let’s Discuss Your Chemical Requirement"
        lead="Looking for Phenol, Paraformaldehyde or another industrial chemical? Send us your requirement and our team will get in touch with you."
      />

      <section className="section-y bg-grid-light bg-mist">
        <div className="container-x grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div id="enquiry" className="scroll-mt-28 rounded-[2rem] border border-line bg-white p-6 shadow-(--shadow-card) sm:p-10">
              <Eyebrow>Request a Quote</Eyebrow>
              <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.25rem)] font-bold tracking-tight">Tell us about your requirement</h2>
              <p className="mt-3 mb-9 leading-relaxed">
                Share the product, quantity and delivery location. Add grade, purity or packaging details if available.
              </p>
              <EnquiryForm readQuery />
            </div>
          </Reveal>

          <div className="lg:col-span-5">
            <div className="space-y-5 lg:sticky lg:top-28">
              <Reveal delay={0.1}>
                <div className="surface-blue relative overflow-hidden rounded-[2rem] border border-brand-500/15 p-8">
                  <div className="bg-grid-light absolute inset-0 opacity-70" aria-hidden />
                  <p className="relative font-display text-xl font-bold tracking-wide text-ink">DS GLOBAL VENTURES</p>
                  <p className="relative mt-1 text-sm text-body">{site.tagline}</p>
                  <ul className="relative mt-8 divide-y divide-brand-700/10">
                    {details.map((d) => {
                      const content = (
                        <>
                          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-white bg-white text-brand-700 shadow-(--shadow-card)">
                            <d.icon className="size-5" aria-hidden />
                          </span>
                          <span className="min-w-0">
                            <span className="block font-mono text-[0.65rem] tracking-[0.16em] text-muted uppercase">{d.label}</span>
                            <span className="mt-0.5 block font-medium break-words text-ink">{d.value}</span>
                          </span>
                        </>
                      );
                      return (
                        <li key={d.label} className="py-4 first:pt-0 last:pb-0">
                          {d.href ? (
                            <a
                              href={d.href}
                              {...(d.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                              className="flex items-center gap-4 transition-colors hover:text-brand-700"
                            >
                              {content}
                            </a>
                          ) : (
                            <div className="flex items-center gap-4">{content}</div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="rounded-[2rem] border border-line bg-white p-8">
                  <h2 className="text-xl font-bold tracking-tight">Quick Enquiry</h2>
                  <p className="mt-2 leading-relaxed">For urgent requirements, contact us directly by phone or WhatsApp.</p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <Button href={telLink()} variant="soft" arrow={false} icon={<Phone className="size-4" />}>
                      Call Now
                    </Button>
                    <Button href={whatsappLink()} variant="whatsapp" arrow={false} icon={<WhatsAppIcon className="size-4" />}>
                      WhatsApp Us
                    </Button>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
