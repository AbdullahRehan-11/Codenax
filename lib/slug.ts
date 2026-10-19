/** Turns a heading into a URL-safe id, e.g. "Cost & Timeline" → "cost-and-timeline". */
export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
  