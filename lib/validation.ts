import { productOptions } from "@/content/products";

export type EnquiryValues = {
  name: string;
  company: string;
  phone: string;
  email: string;
  product: string;
  quantity: string;
  location: string;
  message: string;
  consent: boolean;
};

export type EnquiryErrors = Partial<Record<keyof EnquiryValues, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[0-9\s\-()]{7,20}$/;

export const enquiryLimits = {
  name: 80,
  company: 120,
  phone: 20,
  email: 120,
  quantity: 80,
  location: 120,
  message: 2000,
} as const;

export function readEnquiry(formData: FormData): EnquiryValues {
  const get = (key: string) => String(formData.get(key) ?? "").trim();
  return {
    name: get("name"),
    company: get("company"),
    phone: get("phone"),
    email: get("email"),
    product: get("product"),
    quantity: get("quantity"),
    location: get("location"),
    message: get("message"),
    consent: formData.get("consent") === "on" || formData.get("consent") === "true",
  };
}

export function validateEnquiry(v: EnquiryValues): EnquiryErrors {
  const errors: EnquiryErrors = {};
  const tooLong = (key: keyof typeof enquiryLimits) => v[key].length > enquiryLimits[key];

  if (v.name.length < 2 || tooLong("name")) errors.name = "Please enter your name.";
  if (v.company.length < 2 || tooLong("company")) errors.company = "Please enter your company name.";
  const digits = v.phone.replace(/\D/g, "");
  if (!PHONE_RE.test(v.phone) || digits.length < 7 || digits.length > 15)
    errors.phone = "Please enter a valid mobile number.";
  if (!EMAIL_RE.test(v.email) || tooLong("email")) errors.email = "Please enter a valid email address.";
  if (!productOptions.some((p) => p.value === v.product)) errors.product = "Please select a product.";
  if (tooLong("quantity")) errors.quantity = "Please keep the quantity short (e.g. 20 MT / month).";
  if (v.location.length < 2 || tooLong("location")) errors.location = "Please enter the delivery location.";
  if (tooLong("message")) errors.message = "Please keep the message under 2000 characters.";
  if (!v.consent) errors.consent = "Please confirm we may contact you.";

  return errors;
}

/** Plain-text summary used for WhatsApp / email fallbacks and email bodies. */
export function enquirySummary(v: EnquiryValues) {
  const productLabel = productOptions.find((p) => p.value === v.product)?.label ?? v.product;
  return [
    "New enquiry — DS Global Ventures website",
    "",
    `Name: ${v.name}`,
    `Company: ${v.company}`,
    `Mobile: ${v.phone}`,
    `Email: ${v.email}`,
    `Product: ${productLabel}`,
    `Quantity: ${v.quantity || "—"}`,
    `Delivery location: ${v.location}`,
    `Requirement: ${v.message || "—"}`,
  ].join("\n");
}
