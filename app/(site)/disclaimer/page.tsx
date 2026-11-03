import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal-page";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Disclaimer for product and chemical information published on the DS Global Ventures website.",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer" href="/disclaimer">
      <p>The information on this website is provided in good faith for general information only.</p>
      <p>
        Chemical identifiers (CAS numbers, formulas, HS codes) are standard published data. Physical form, packaging and
        transport classifications are indicative and may vary by grade, concentration and supplier.
      </p>
      <p>
        DS Global Ventures does not claim certifications, manufacturer authorisations, or regulatory approvals unless
        expressly stated with supporting documentation.
      </p>
      <p>
        Always refer to the supplier Safety Data Sheet (SDS) and agreed specifications before handling, storing,
        transporting or using any chemical product.
      </p>
      <p>Product names and trademarks, if any, belong to their respective owners.</p>
    </LegalPage>
  );
}
