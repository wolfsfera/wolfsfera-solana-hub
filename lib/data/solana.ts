import "server-only";

const SOL_SIMPLE_PRICE_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd&include_24hr_change=true&include_market_cap=true&include_last_updated_at=true";

const TOKEN_MARKETS_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&sparkline=true&price_change_percentage=24h";

const DEFAULT_TOKEN_IDS = [
  "solana",
  "jito",
  "jupiter-exchange-solana",
  "bonk",
  "render-token",
  "pyth-network",
  "helium",
];

export interface SolPriceSummary {
  price: number;
  change24h: number;
  marketCap?: number | null;
  lastUpdated?: string | null;
  stale: boolean;
}

export interface TokenBrief {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  marketCap?: number | null;
  sparkline: number[];
  lastUpdated?: string | null;
  externalUrl: string;
}

export interface TokensBriefResponse {
  tokens: TokenBrief[];
  stale: boolean;
}

export interface PumpfunTrendingItem {
  name: string;
  url: string;
  initialMarketCap?: number | null;
}

export interface PumpfunTrendingResponse {
  items: PumpfunTrendingItem[];
  stale: boolean;
}

const MOCK_SOL_PRICE: SolPriceSummary = {
  price: 0,
  change24h: 0,
  marketCap: 0,
  lastUpdated: null,
  stale: true,
};

const MOCK_TOKENS: TokensBriefResponse = {
  stale: true,
  tokens: [
    {
      id: "solana",
      symbol: "sol",
      name: "Solana",
      price: 0,
      change24h: 0,
      marketCap: 0,
      sparkline: Array(7).fill(0),
      lastUpdated: null,
      externalUrl: "https://www.coingecko.com/en/coins/solana",
    },
    {
      id: "jito",
      symbol: "jito",
      name: "Jito",
      price: 0,
      change24h: 0,
      marketCap: 0,
      sparkline: Array(7).fill(0),
      lastUpdated: null,
      externalUrl: "https://www.coingecko.com/en/coins/jito",
    },
    {
      id: "jupiter-exchange-solana",
      symbol: "jup",
      name: "Jupiter",
      price: 0,
      change24h: 0,
      marketCap: 0,
      sparkline: Array(7).fill(0),
      lastUpdated: null,
      externalUrl: "https://www.coingecko.com/en/coins/jupiter-exchange-solana",
    },
    {
      id: "bonk",
      symbol: "bonk",
      name: "Bonk",
      price: 0,
      change24h: 0,
      marketCap: 0,
      sparkline: Array(7).fill(0),
      lastUpdated: null,
      externalUrl: "https://www.coingecko.com/en/coins/bonk",
    },
    {
      id: "render-token",
      symbol: "rndr",
      name: "Render",
      price: 0,
      change24h: 0,
      marketCap: 0,
      sparkline: Array(7).fill(0),
      lastUpdated: null,
      externalUrl: "https://www.coingecko.com/en/coins/render-token",
    },
  ],
};

const MOCK_PUMPFUN: PumpfunTrendingResponse = {
  stale: true,
  items: [
    {
      name: "Solana Wolves",
      url: "https://pump.fun/coin/solana-wolves",
      initialMarketCap: 15000,
    },
    {
      name: "Quantum Bonk",
      url: "https://pump.fun/coin/quantum-bonk",
      initialMarketCap: 9800,
    },
    {
      name: "Jito Velocity",
      url: "https://pump.fun/coin/jito-velocity",
      initialMarketCap: 11200,
    },
    {
      name: "Render Pulse",
      url: "https://pump.fun/coin/render-pulse",
      initialMarketCap: 8700,
    },
    {
      name: "Pyth Oracle",
      url: "https://pump.fun/coin/pyth-oracle",
      initialMarketCap: 9300,
    },
  ],
};

function buildTokenUrl(id: string): string {
  return `https://www.coingecko.com/en/coins/${id}`;
}

export async function getSolPrice(): Promise<SolPriceSummary> {
  try {
    const response = await fetch(SOL_SIMPLE_PRICE_URL, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Failed to load SOL price: ${response.status}`);
    }

    const json = (await response.json()) as Record<string, any>;
    const solana = json.solana;

    if (!solana) {
      throw new Error("Missing Solana price data");
    }

    const price = typeof solana.usd === "number" ? solana.usd : 0;
    const change24h = typeof solana.usd_24h_change === "number" ? solana.usd_24h_change : 0;
    const marketCap = typeof solana.usd_market_cap === "number" ? solana.usd_market_cap : null;
    const lastUpdated = typeof solana.last_updated_at === "number" ? new Date(solana.last_updated_at * 1000).toISOString() : null;

    return {
      price,
      change24h,
      marketCap,
      lastUpdated,
      stale: false,
    };
  } catch (error) {
    console.error("getSolPrice error", error);
    return MOCK_SOL_PRICE;
  }
}

interface CoinMarket {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number | null;
  last_updated: string | null;
  sparkline_in_7d?: {
    price: number[];
  };
}

export async function getTokensBrief(ids: string[] = DEFAULT_TOKEN_IDS): Promise<TokensBriefResponse> {
  try {
    const url = `${TOKEN_MARKETS_URL}&ids=${encodeURIComponent(ids.join(","))}`;
    const response = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Failed to load token markets: ${response.status}`);
    }

    const coins = (await response.json()) as CoinMarket[];

    if (!Array.isArray(coins) || coins.length === 0) {
      throw new Error("Empty token list");
    }

    const tokens: TokenBrief[] = coins.map((coin) => ({
      id: coin.id,
      symbol: coin.symbol,
      name: coin.name,
      price: typeof coin.current_price === "number" ? coin.current_price : 0,
      change24h:
        typeof coin.price_change_percentage_24h === "number" ? coin.price_change_percentage_24h : 0,
      marketCap: typeof coin.market_cap === "number" ? coin.market_cap : null,
      sparkline: Array.isArray(coin.sparkline_in_7d?.price) ? coin.sparkline_in_7d.price : [],
      lastUpdated: coin.last_updated ?? null,
      externalUrl: buildTokenUrl(coin.id),
    }));

    return { tokens, stale: false };
  } catch (error) {
    console.error("getTokensBrief error", error);
    return MOCK_TOKENS;
  }
}

export async function getPumpfunTrending(): Promise<PumpfunTrendingResponse> {
  try {
    const response = await fetch("https://pump.fun/api/trending", {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Failed to load pump.fun trending: ${response.status}`);
    }

    const json = (await response.json()) as { name?: string; market_cap?: number; url?: string }[];

    if (!Array.isArray(json) || json.length === 0) {
      throw new Error("Empty pump.fun list");
    }

    const items: PumpfunTrendingItem[] = json.slice(0, 5).map((item) => ({
      name: item.name ?? "Pump.fun token",
      url: item.url ?? "https://pump.fun",
      initialMarketCap: typeof item.market_cap === "number" ? item.market_cap : null,
    }));

    return { items, stale: false };
  } catch (error) {
    console.warn("getPumpfunTrending fallback", error);
    return MOCK_PUMPFUN;
  }
}
