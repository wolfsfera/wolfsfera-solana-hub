export type InvestmentCategory =
  | "staking"
  | "wallet"
  | "exchange"
  | "hardware"
  | "fiat-onramp";

export type InvestmentRisk = "low" | "mid" | "high";

export interface Investment {
  id: string;
  name: string;
  category: InvestmentCategory;
  risk: InvestmentRisk;
  summary: string;
  url: string;
  whitelistDomain: string;
}
