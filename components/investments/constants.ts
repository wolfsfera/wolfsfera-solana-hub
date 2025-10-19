import type { InvestmentCategory } from "./types";

export const CATEGORY_LABELS: Record<InvestmentCategory, string> = {
  staking: "Staking",
  wallet: "Wallet",
  exchange: "Exchange",
  hardware: "Hardware",
  "fiat-onramp": "Fiat on-ramp",
};
