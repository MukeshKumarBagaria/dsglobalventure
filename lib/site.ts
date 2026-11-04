/**
 * Central business configuration.
 * TODO (before go-live): replace every placeholder value marked `PLACEHOLDER`.
 * See docs/01-WEBSITE-CONTENT.md §0.7 and §12.
 */
export const site = {
  name: "DS Global Ventures",
  legalName: "DS Global Ventures",
  tagline: "Reliable Chemical Sourcing. Trusted Global Trade.",
  descriptor: "Industrial Chemicals | Chemical Raw Materials | Sourcing | Trading | Supply",
  description:
    "Industrial chemical supplier and sourcing partner — Phenol, Paraformaldehyde, Formaldehyde, Methanol, Acetone and more for resin, plywood, paint and pharma.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.dsglobalventures.com").replace(/\/$/, ""),
  locale: "en_IN",

  contact: {
    /** display format */
    phoneDisplay: "+91 98933 53200",
    /** E.164 digits used for tel: links */
    phoneE164: "+919893353200",
    /** digits only, country code first, used for wa.me links */
    whatsapp: "919893353200",
    whatsappDisplay: "+91 98933 53200",
    /** PLACEHOLDER */
    email: "info@dsglobalventures.com",
    /** PLACEHOLDER */
    address: "Office address to be updated, India",
    city: "India",
    hours: "Monday – Saturday, 9:30 AM – 6:30 PM",
    hoursShort: "Mon – Sat · 9:30 AM – 6:30 PM",
  },

  whatsappGreeting:
    "Hello DS Global Ventures, I would like to enquire about an industrial chemical requirement.",

  copyrightYear: 2026,
} as const;

export function whatsappLink(message: string = site.whatsappGreeting) {
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function telLink() {
  return `tel:${site.contact.phoneE164}`;
}

export function mailLink(subject?: string, body?: string) {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString().replace(/\+/g, "%20");
  return `mailto:${site.contact.email}${query ? `?${query}` : ""}`;
}

export function absoluteUrl(path = "/") {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
