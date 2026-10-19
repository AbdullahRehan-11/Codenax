import { contactForm } from "@/content/contact";

export type ContactValues = {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  details: string;
};

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

export const emptyContact: ContactValues = { name: "", email: "", company: "", service: "", budget: "", details: "" };

// Our wording (not on codenax.com): the site's own messages come from its form library.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Returns the error for one field, or undefined when it is valid. */
export function validateField(field: keyof ContactValues, value: string): string | undefined {
  const text = value.trim();
  switch (field) {
    case "name":
      return text.length < 2 ? "Please enter your name." : undefined;
    case "email":
      if (!text) return "Please enter your email.";
      return EMAIL.test(text) ? undefined : "Please enter a valid email address.";
    case "service":
      return text ? undefined : "Please choose a service.";
    case "details":
      if (text.length < 10) return "Please tell us a little about your project (at least 10 characters).";
      return text.length > contactForm.fields.details.maxLength
        ? `Please keep it under ${contactForm.fields.details.maxLength} characters.`
        : undefined;
    default:
      return undefined;
  }
}

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  for (const field of Object.keys(values) as (keyof ContactValues)[]) {
    const error = validateField(field, values[field]);
    if (error) errors[field] = error;
  }
  return errors;
}

export type SubmitResult = { status: "success" };

/**
 * The single place a backend will plug in later. There is none yet, so nothing is sent or
 * stored: it waits briefly (so the loading state is visible) and reports success
 * (owner decision 2026-10-07).
 */
export async function submitContact(values: ContactValues): Promise<SubmitResult> {
  void values;
  await new Promise((resolve) => setTimeout(resolve, 900));
  return { status: "success" };
}

/** A mailto: link carrying the form, so the visitor can send it from their own email app. */
export function contactMailto(email: string, values: ContactValues): string {
  const { fields } = contactForm;
  const lines = [
    `${fields.name.label}: ${values.name}`,
    `${fields.email.label}: ${values.email}`,
    ...(values.company ? [`${fields.company.label}: ${values.company}`] : []),
    `${fields.service.label}: ${values.service}`,
    ...(values.budget ? [`${fields.budget.label}: ${values.budget}`] : []),
    "",
    values.details,
  ];
  const subject = `${values.service} – ${values.name}`;
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}
