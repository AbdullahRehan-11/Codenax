/**
 * Structured data for search engines, as the Next.js JSON-LD guide recommends: a plain
 * <script type="application/ld+json">. "<" is escaped so text can never close the tag.
 */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
