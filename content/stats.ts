// The company stats from codenax.com, verbatim (captured 2026-10-05). The home hero shows the
// first three; the strip on the home, About and Why Us pages shows all four, as on the site.
// Owner decision (2026-10-05): show them as the site does (CONTENT-GAPS.md §1).

export type Stat = {
  /** As written on the site, e.g. "120+" or "99%". */
  value: string;
  label: string;
};

export const companyStats: Stat[] = [
  { value: "120+", label: "Live Applications" },
  { value: "99%", label: "Client Retention" },
  { value: "10+", label: "Years of Experience" },
  { value: "8+", label: "Industries Served" },
];

/** The three the home hero shows, in its order. */
export const heroStats = companyStats.slice(0, 3);
