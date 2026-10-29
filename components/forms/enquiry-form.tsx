"use client";

import { CircleAlert, CircleCheckBig, LoaderCircle, Mail, Send } from "lucide-react";
import { useEffect, useId, useRef, useState, useTransition, type CSSProperties, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { productOptions } from "@/content/products";
import { submitEnquiry } from "@/lib/actions/enquiry";
import { mailLink, whatsappLink } from "@/lib/site";
import { cx as cn } from "@/lib/cx";
import { enquiryLimits, enquirySummary, readEnquiry, validateEnquiry, type EnquiryErrors, type EnquiryValues } from "@/lib/validation";

type Status = "idle" | "success" | "fallback";

const fieldBase =
  "block w-full rounded-xl border bg-white px-4 text-[0.95rem] text-ink placeholder:text-muted/80 transition-[border-color,box-shadow] duration-200 outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15";

function Field({
  id,
  label,
  required,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-ink">
        {label}
        {required ? <span className="text-brand-600"> *</span> : <span className="font-normal text-muted"> (optional)</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="anim-rise mt-1.5 flex items-center gap-1.5 text-[0.8rem] font-medium text-red-600" style={{ "--ry": "-4px" } as CSSProperties}>
            <CircleAlert className="size-3.5 shrink-0" aria-hidden />
            {error}
          </p>
      ) : null}
    </div>
  );
}

export function EnquiryForm({
  defaultProduct = "",
  lockProduct = false,
  readQuery = false,
  defaultMessage = "",
  submitLabel = "Submit Enquiry",
  className,
}: {
  defaultProduct?: string;
  lockProduct?: boolean;
  /** read ?product= and ?type= from the URL on mount (contact page) */
  readQuery?: boolean;
  defaultMessage?: string;
  submitLabel?: string;
  className?: string;
}) {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [submitted, setSubmitted] = useState<EnquiryValues | null>(null);
  const [pending, startTransition] = useTransition();
  const id = (name: string) => `${uid}-${name}`;

  useEffect(() => {
    if (!readQuery || !formRef.current) return;
    const params = new URLSearchParams(window.location.search);
    const product = params.get("product");
    const form = formRef.current;
    if (product && productOptions.some((p) => p.value === product)) {
      (form.elements.namedItem("product") as HTMLSelectElement).value = product;
    }
    const message = form.elements.namedItem("message") as HTMLTextAreaElement;
    if (params.get("type") === "bulk" && !message.value) {
      message.value =
        "Bulk requirement —\nGrade / specification: \nMonthly / one-time quantity: \nPackaging: \nDelivery schedule: ";
    }
    const doc = params.get("doc");
    if (doc && !message.value) message.value = `Please share the ${doc} for the selected product.`;
  }, [readQuery]);

  function revalidate(name: keyof EnquiryValues) {
    if (!errors[name] || !formRef.current) return;
    const next = validateEnquiry(readEnquiry(new FormData(formRef.current)));
    setErrors((prev) => ({ ...prev, [name]: next[name] }));
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    if (lockProduct) formData.set("product", defaultProduct);
    const values = readEnquiry(formData);
    const found = validateEnquiry(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0];
      (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }

    startTransition(async () => {
      try {
        const result = await submitEnquiry(formData);
        if (result.ok) {
          setSubmitted(values);
          setStatus("success");
          form.reset();
        } else if (result.reason === "invalid") {
          setErrors(result.errors);
        } else {
          setSubmitted(values);
          setStatus("fallback");
        }
      } catch {
        setSubmitted(values);
        setStatus("fallback");
      }
    });
  }

  const describedBy = (name: keyof EnquiryValues) => (errors[name] ? `${id(name)}-error` : undefined);
  const inputClass = (name: keyof EnquiryValues) =>
    cn(fieldBase, "h-12", errors[name] ? "border-red-400" : "border-line hover:border-ink/25");

  return (
    <div className={cn("relative", className)}>
      {status === "idle" ? (
          <form
            ref={formRef}
            noValidate
            onSubmit={onSubmit}
            className="grid gap-5 sm:grid-cols-2"
          >
            {/* honeypot */}
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                Website
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <Field id={id("name")} label="Name" required error={errors.name}>
              <input
                id={id("name")}
                name="name"
                autoComplete="name"
                placeholder="Enter name"
                maxLength={enquiryLimits.name}
                aria-invalid={!!errors.name}
                aria-describedby={describedBy("name")}
                onChange={() => revalidate("name")}
                className={inputClass("name")}
              />
            </Field>
            <Field id={id("company")} label="Company Name" required error={errors.company}>
              <input
                id={id("company")}
                name="company"
                autoComplete="organization"
                placeholder="Enter company"
                maxLength={enquiryLimits.company}
                aria-invalid={!!errors.company}
                aria-describedby={describedBy("company")}
                onChange={() => revalidate("company")}
                className={inputClass("company")}
              />
            </Field>
            <Field id={id("phone")} label="Mobile Number" required error={errors.phone}>
              <input
                id={id("phone")}
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="Enter mobile"
                maxLength={enquiryLimits.phone}
                aria-invalid={!!errors.phone}
                aria-describedby={describedBy("phone")}
                onChange={() => revalidate("phone")}
                className={inputClass("phone")}
              />
            </Field>
            <Field id={id("email")} label="Email Address" required error={errors.email}>
              <input
                id={id("email")}
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="Enter email"
                maxLength={enquiryLimits.email}
                aria-invalid={!!errors.email}
                aria-describedby={describedBy("email")}
                onChange={() => revalidate("email")}
                className={inputClass("email")}
              />
            </Field>
            <Field id={id("product")} label="Product Required" required error={errors.product}>
              <div className="relative">
                <select
                  id={id("product")}
                  name="product"
                  defaultValue={defaultProduct}
                  disabled={lockProduct}
                  aria-invalid={!!errors.product}
                  aria-describedby={describedBy("product")}
                  onChange={() => revalidate("product")}
                  className={cn(inputClass("product"), "appearance-none pr-10 disabled:bg-mist disabled:text-ink")}
                >
                  <option value="" disabled>
                    Select product
                  </option>
                  {productOptions.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
                <svg
                  aria-hidden
                  viewBox="0 0 20 20"
                  className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted"
                  fill="currentColor"
                >
                  <path d="M5.3 7.3a1 1 0 0 1 1.4 0L10 10.6l3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 0-1.4Z" />
                </svg>
              </div>
            </Field>
            <Field id={id("quantity")} label="Required Quantity" error={errors.quantity}>
              <input
                id={id("quantity")}
                name="quantity"
                placeholder="e.g. 20 MT / month"
                maxLength={enquiryLimits.quantity}
                aria-invalid={!!errors.quantity}
                aria-describedby={describedBy("quantity")}
                className={inputClass("quantity")}
              />
            </Field>
            <Field id={id("location")} label="Delivery Location" required error={errors.location} className="sm:col-span-2">
              <input
                id={id("location")}
                name="location"
                autoComplete="address-level2"
                placeholder="City, state, country"
                maxLength={enquiryLimits.location}
                aria-invalid={!!errors.location}
                aria-describedby={describedBy("location")}
                onChange={() => revalidate("location")}
                className={inputClass("location")}
              />
            </Field>
            <Field id={id("message")} label="Message / Specification" error={errors.message} className="sm:col-span-2">
              <textarea
                id={id("message")}
                name="message"
                rows={4}
                defaultValue={defaultMessage}
                placeholder="Grade, purity, packaging, delivery schedule…"
                maxLength={enquiryLimits.message}
                aria-invalid={!!errors.message}
                aria-describedby={describedBy("message")}
                className={cn(fieldBase, "resize-y py-3", errors.message ? "border-red-400" : "border-line hover:border-ink/25")}
              />
            </Field>

            <div className="sm:col-span-2">
              <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed">
                <input
                  type="checkbox"
                  name="consent"
                  aria-invalid={!!errors.consent}
                  aria-describedby={describedBy("consent")}
                  onChange={() => revalidate("consent")}
                  className="mt-0.5 size-5 shrink-0 cursor-pointer rounded border-line accent-brand-500"
                />
                <span>I agree to be contacted by DS Global Ventures regarding this enquiry.</span>
              </label>
              {errors.consent ? (
                <p id={`${id("consent")}-error`} className="mt-1.5 flex items-center gap-1.5 text-[0.8rem] font-medium text-red-600">
                  <CircleAlert className="size-3.5" aria-hidden />
                  {errors.consent}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <Button
                type="submit"
                size="lg"
                disabled={pending}
                arrow={false}
                icon={pending ? <LoaderCircle className="size-4 animate-spin" /> : <Send className="size-4" />}
                className="w-full sm:w-auto"
              >
                {pending ? "Sending…" : submitLabel}
              </Button>
              <p className="text-xs text-muted">Fields marked * are required.</p>
            </div>
            <p aria-live="polite" className="sr-only">
              {pending ? "Sending your enquiry" : ""}
            </p>
          </form>
        ) : (
          <div key={status} role="status" className="anim-rise flex flex-col items-start py-6">
            {status === "success" ? (
              <>
                <span className="anim-pop flex size-16 items-center justify-center rounded-full bg-brand-400/15 text-brand-600">
                  <CircleCheckBig className="size-8" strokeWidth={1.75} aria-hidden />
                </span>
                <h3 className="mt-6 text-2xl font-bold tracking-tight">Thank you — your enquiry has been received.</h3>
                <p className="mt-3 max-w-lg leading-relaxed">
                  Our team will review your requirement and get back to you shortly. For urgent requirements, call or
                  WhatsApp us.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button type="button" variant="outline" arrow={false} onClick={() => setStatus("idle")}>
                    Send another enquiry
                  </Button>
                  <Button href={whatsappLink()} variant="whatsapp" arrow={false} icon={<WhatsAppIcon className="size-4" />}>
                    WhatsApp Us
                  </Button>
                </div>
              </>
            ) : (
              <>
                <span className="flex size-16 items-center justify-center rounded-full bg-amber-400/15 text-amber-500">
                  <CircleAlert className="size-8" strokeWidth={1.75} aria-hidden />
                </span>
                <h3 className="mt-6 text-2xl font-bold tracking-tight">We couldn’t send your enquiry online right now.</h3>
                <p className="mt-3 max-w-lg leading-relaxed">
                  Please send the same details on WhatsApp or email — we have prepared the message for you.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button
                    href={whatsappLink(submitted ? enquirySummary(submitted) : undefined)}
                    variant="whatsapp"
                    arrow={false}
                    icon={<WhatsAppIcon className="size-4" />}
                  >
                    Send via WhatsApp
                  </Button>
                  <Button
                    href={mailLink("Website enquiry", submitted ? enquirySummary(submitted) : undefined)}
                    variant="soft"
                    arrow={false}
                    icon={<Mail className="size-4" />}
                  >
                    Send via Email
                  </Button>
                  <Button type="button" variant="outline" arrow={false} onClick={() => setStatus("idle")}>
                    Back to form
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
    </div>
  );
}
