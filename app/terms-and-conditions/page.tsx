import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal-page";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms governing the use of the DS Global Ventures website.",
  alternates: { canonical: "/terms-and-conditions" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions" href="/terms-and-conditions">
      <h2>1. Use of website</h2>
      <p>
        The website provides general information about DS Global Ventures and its products and services. By using it, you
        agree to these terms.
      </p>
      <h2>2. No offer</h2>
      <p>
        Website content does not constitute an offer to sell. All supplies are subject to written quotation, order
        confirmation and agreed commercial terms.
      </p>
      <h2>3. Product information</h2>
      <p>
        Specifications, packaging and availability are indicative and may change without notice. Agreed specifications and
        supplier documentation prevail.
      </p>
      <h2>4. Pricing</h2>
      <p>
        Prices are provided only on enquiry and depend on product, grade, quantity, packaging, destination and market
        conditions.
      </p>
      <h2>5. Compliance</h2>
      <p>
        Customers are responsible for lawful use, storage and handling of chemical products, including any licences or
        permits required for controlled substances.
      </p>
      <h2>6. Intellectual property</h2>
      <p>
        Website content, design and branding belong to DS Global Ventures unless otherwise stated. Photography is used
        under the Unsplash licence.
      </p>
      <h2>7. Limitation of liability</h2>
      <p>DS Global Ventures is not liable for any loss arising from reliance on website information.</p>
      <h2>8. Governing law</h2>
      <p>These terms are governed by the laws of India.</p>
    </LegalPage>
  );
}
