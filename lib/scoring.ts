export const toRiskLabel = (score: number) =>
  score >= 80 ? "High" : score >= 55 ? "Moderate" : "Low";
