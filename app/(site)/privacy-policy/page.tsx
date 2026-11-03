import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How DS Global Ventures collects and uses information submitted through this website.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" href="/privacy-policy">
      <h2>1. Introduction</h2>
      <p>
        This Privacy Policy explains how DS Global Ventures (“we”, “us”) collects and uses information submitted through
        this website.
      </p>
      <h2>2. Information we collect</h2>
      <p>
        Information you provide in enquiry forms (name, company, mobile number, email, product requirement, quantity,
        delivery location and message) and basic technical data (browser type, pages visited) collected through standard
        server logs.
      </p>
      <h2>3. How we use information</h2>
      <p>
        To respond to enquiries, prepare quotations, coordinate supply, improve the website, and comply with legal
        obligations. We do not sell personal information.
      </p>
      <h2>4. Sharing</h2>
      <p>
        Information may be shared with suppliers, logistics partners or service providers only as necessary to respond to
        or fulfil your requirement, and where required by law.
      </p>
      <h2>5. Retention</h2>
      <p>Enquiry data is retained only as long as needed for the purposes above or as required by law.</p>
      <h2>6. Security</h2>
      <p>
        Reasonable technical and organisational measures are used to protect information. No internet transmission is
        completely secure.
      </p>
      <h2>7. Your choices</h2>
      <p>You may request access, correction or deletion of your information by writing to {site.contact.email}.</p>
      <h2>8. Cookies</h2>
      <p>
        The website uses only essential cookies/storage required for it to function. If analytics is added later, this
        policy will be updated.
      </p>
      <h2>9. Changes</h2>
      <p>This policy may be updated from time to time.</p>
      <h2>10. Contact</h2>
      <p>
        {site.contact.email} · {site.contact.address}
      </p>
    </LegalPage>
  );
}
