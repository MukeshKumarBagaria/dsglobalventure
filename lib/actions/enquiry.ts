"use server";

import { productOptions } from "@/content/products";
import { enquirySummary, readEnquiry, validateEnquiry, type EnquiryErrors } from "@/lib/validation";

export type EnquiryResult =
  | { ok: true }
  | { ok: false; reason: "invalid"; errors: EnquiryErrors }
  | { ok: false; reason: "not_configured" | "delivery" };

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Receives an enquiry from the website form.
 * Delivery uses a transactional email API (Resend-compatible REST endpoint).
 * Required env vars: RESEND_API_KEY, ENQUIRY_TO_EMAIL. Optional: ENQUIRY_FROM_EMAIL.
 * See docs/02-SRS-AND-DESIGN.md §A10 and Part F.
 */
export async function submitEnquiry(formData: FormData): Promise<EnquiryResult> {
  // Honeypot: real users never fill this hidden field.
  if (String(formData.get("website") ?? "").length > 0) return { ok: true };

  const values = readEnquiry(formData);
  const errors = validateEnquiry(values);
  if (Object.keys(errors).length > 0) return { ok: false, reason: "invalid", errors };

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL;
  const from = process.env.ENQUIRY_FROM_EMAIL ?? "DS Global Ventures Website <onboarding@resend.dev>";

  const text = enquirySummary(values);

  if (!apiKey || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[enquiry] Email delivery not configured — enquiry logged instead:\n" + text);
      return { ok: true };
    }
    console.error("[enquiry] RESEND_API_KEY / ENQUIRY_TO_EMAIL are not set; enquiry could not be delivered.");
    return { ok: false, reason: "not_configured" };
  }

  const productLabel = productOptions.find((p) => p.value === values.product)?.label ?? values.product;
  const rows: [string, string][] = [
    ["Name", values.name],
    ["Company", values.company],
    ["Mobile", values.phone],
    ["Email", values.email],
    ["Product", productLabel],
    ["Quantity", values.quantity || "—"],
    ["Delivery location", values.location],
    ["Requirement", values.message || "—"],
  ];
  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#0b1324;max-width:640px">
      <h2 style="margin:0 0 4px;font-size:20px">New website enquiry</h2>
      <p style="margin:0 0 20px;color:#4b5568">${escapeHtml(productLabel)} — ${escapeHtml(values.company)}</p>
      <table cellpadding="10" cellspacing="0" style="border-collapse:collapse;width:100%;font-size:14px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="border-bottom:1px solid #e3e8ef;color:#7a8599;width:160px;vertical-align:top">${k}</td><td style="border-bottom:1px solid #e3e8ef;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
          )
          .join("")}
      </table>
    </div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: to.split(",").map((s) => s.trim()),
        reply_to: values.email,
        subject: `Enquiry: ${productLabel} — ${values.company}`,
        html,
        text,
      }),
    });
    if (!res.ok) {
      console.error("[enquiry] Email provider responded with", res.status, await res.text());
      return { ok: false, reason: "delivery" };
    }
    return { ok: true };
  } catch (error) {
    console.error("[enquiry] Email delivery failed", error);
    return { ok: false, reason: "delivery" };
  }
}
