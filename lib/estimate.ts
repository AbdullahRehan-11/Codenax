import { estimatorFeatures, estimatorRules, projectTypes } from "@/content/estimator"; 

export type Estimate = {
  hours: number;
  low: number;
  high: number;
  /** True when the total fits one 80-hour MVP sprint. */
  fitsSprint: boolean;
};

const roundTo = (value: number, step: number) => Math.round(value / step) * step;

/** Pure calculation: base hours of the project type plus each chosen feature, priced at the two rates. */
export function estimate(projectTypeId: string, featureIds: string[]): Estimate {
  const base = projectTypes.find((type) => type.id === projectTypeId)?.hours ?? 0;
  const extra = estimatorFeatures
    .filter((feature) => featureIds.includes(feature.id))
    .reduce((sum, feature) => sum + feature.hours, 0);
  const hours = base + extra;
  const { lowRatePerHour, highRatePerHour, roundTo: step, mvpSprintHours } = estimatorRules;
  return {
    hours,
    low: roundTo(hours * lowRatePerHour, step),
    high: roundTo(hours * highRatePerHour, step),
    fitsSprint: hours <= mvpSprintHours,
  };
}

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export const formatUsd = (value: number) => usd.format(value);
