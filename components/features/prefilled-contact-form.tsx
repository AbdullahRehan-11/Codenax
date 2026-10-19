"use client";

import { useSearchParams } from "next/navigation";
import { ContactForm } from "./contact-form";

/** The contact form, prefilled from the URL (?details=…) when the visitor comes from the estimator. */
export function PrefilledContactForm() {
  const params = useSearchParams();
  const details = params.get("details") ?? "";
  // key: a new prefill (another estimate) starts a fresh form.
  return <ContactForm key={details} initial={{ details }} />;
}
