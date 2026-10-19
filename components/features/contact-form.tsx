"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { contactForm } from "@/content/contact";
import { site } from "@/content/site";
import {
  emptyContact,
  submitContact,
  validateContact,
  validateField,
  type ContactErrors,
  type ContactValues,
} from "@/lib/contact";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { Icon } from "@/components/ui/icon";

type Status = "idle" | "submitting" | "success" | "error";
type FieldName = keyof ContactValues;

/**
 * The enquiry form. Validates on blur and on submit, then calls the submitContact() stub and
 * shows a thank-you screen. There is no backend yet, so nothing is actually sent.
 */
export function ContactForm({ initial }: { initial?: Partial<ContactValues> }) {
  const { fields } = contactForm;
  const [values, setValues] = useState<ContactValues>({ ...emptyContact, ...initial });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const summaryRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLHeadingElement>(null);
  const [showSummary, setShowSummary] = useState(false);

  // Move focus to whatever just appeared, so screen-reader and keyboard users land on it.
  useEffect(() => {
    if (status === "success") resultRef.current?.focus();
  }, [status]);

  function update(field: FieldName, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    // Once a field has been left with an error, re-check it while the visitor fixes it.
    if (touched[field]) setErrors((e) => ({ ...e, [field]: validateField(field, value) }));
  }

  function blur(field: FieldName) {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors((e) => ({ ...e, [field]: validateField(field, values[field]) }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    setTouched({ name: true, email: true, company: true, service: true, budget: true, details: true });
    if (Object.keys(found).length > 0) {
      setShowSummary(true);
      // Wait for the summary to render before focusing it.
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setShowSummary(false);
    setStatus("submitting");
    try {
      const result = await submitContact(values);
      setStatus(result.status);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    const { success } = contactForm;
    return (
      <div role="status" className="flex animate-fade-up flex-col items-start gap-5">
        <span className="grid size-14 place-items-center rounded-2xl bg-success-soft text-success">
          <Icon name="check" className="size-7" />
        </span>
        <h2 ref={resultRef} tabIndex={-1} className="text-display-3 font-bold outline-none">
          {success.title}
        </h2>
        <p className="text-muted">{success.text}</p>
        <button
          type="button"
          onClick={() => {
            setValues(emptyContact);
            setTouched({});
            setErrors({});
            setStatus("idle");
          }}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted transition-colors hover:text-link"
        >
          <Icon name="chevron-left" className="size-4" />
          {success.again}
        </button>
      </div>
    );
  }

  const errorList = (Object.keys(errors) as FieldName[]).filter((field) => errors[field]);
  const submitting = status === "submitting";
  const detailsLength = values.details.length;

  // Shared props for every control: value, change and blur handlers.
  const bind = (field: FieldName) => ({
    name: field,
    value: values[field],
    onChange: (event: { target: { value: string } }) => update(field, event.target.value),
    onBlur: () => blur(field),
    disabled: submitting,
  });

  return (
    <form noValidate onSubmit={onSubmit} aria-busy={submitting} className="flex flex-col gap-6">
      {showSummary && errorList.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="animate-fade-up rounded-2xl border border-danger/40 bg-danger-soft p-5 outline-none"
        >
          <p className="flex items-center gap-2 font-semibold text-danger">
            <Icon name="alert-circle" className="size-5" />
            Please fix {errorList.length === 1 ? "this field" : `these ${errorList.length} fields`}:
          </p>
          <ul className="mt-2 flex flex-col gap-1 pl-7 text-sm">
            {errorList.map((field) => (
              <li key={field}>
                <a href={`#contact-${field}`} className="font-medium text-danger underline underline-offset-4">
                  {fields[field].label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {status === "error" && (
        <p role="alert" className="flex items-start gap-2 rounded-2xl border border-danger/40 bg-danger-soft p-5 text-sm font-medium text-danger">
          <Icon name="alert-circle" className="mt-0.5 size-4" />
          Something went wrong. Please try again, or email us at {site.email}.
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="contact-name" label={fields.name.label} required error={touched.name ? errors.name : undefined}>
          {(p) => <Input {...p} {...bind("name")} autoComplete="name" placeholder={fields.name.placeholder} />}
        </Field>
        <Field id="contact-email" label={fields.email.label} required error={touched.email ? errors.email : undefined}>
          {(p) => (
            <Input {...p} {...bind("email")} type="email" autoComplete="email" inputMode="email" placeholder={fields.email.placeholder} />
          )}
        </Field>
        <Field id="contact-company" label={fields.company.label}>
          {(p) => <Input {...p} {...bind("company")} autoComplete="organization" placeholder={fields.company.placeholder} />}
        </Field>
        <Field id="contact-service" label={fields.service.label} required error={touched.service ? errors.service : undefined}>
          {(p) => (
            <Select {...p} {...bind("service")} className={cn(!values.service && "text-muted")}>
              <option value="" disabled>
                {fields.service.placeholder}
              </option>
              {fields.service.options.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </Select>
          )}
        </Field>
        <Field id="contact-budget" label={fields.budget.label} className="sm:col-span-2">
          {(p) => (
            <Select {...p} {...bind("budget")} className={cn(!values.budget && "text-muted")}>
              <option value="">{fields.budget.placeholder}</option>
              {fields.budget.options.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </Select>
          )}
        </Field>
        <Field
          id="contact-details"
          label={fields.details.label}
          hint={fields.details.hint}
          required
          error={touched.details ? errors.details : undefined}
          className="sm:col-span-2"
        >
          {(p) => (
            <div className="relative">
              <Textarea
                {...p}
                {...bind("details")}
                rows={6}
                maxLength={fields.details.maxLength}
                placeholder={fields.details.placeholder}
                className="pb-8"
              />
              <span
                aria-hidden
                className={cn(
                  "pointer-events-none absolute right-4 bottom-3 text-xs tabular-nums",
                  detailsLength > fields.details.maxLength * 0.9 ? "text-danger" : "text-muted",
                )}
              >
                {detailsLength}/{fields.details.maxLength}
              </span>
            </div>
          )}
        </Field>
      </div>

      <div className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 text-sm text-muted">
          <Icon name="shield-check" className="size-4 text-link" />
          {contactForm.privacyNote}
        </p>
        <Button type="submit" size="lg" block disabled={submitting}>
          {submitting ? (
            <>
              <Icon name="loader" className="size-4 animate-spin" />
              {contactForm.sending}
            </>
          ) : (
            <>
              {contactForm.submit}
              <Icon name="send" className="size-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
