import { NextResponse } from "next/server";
import { getPumpfunTrending } from "@/lib/data/solana";

export const revalidate = 60;

export async function GET() {
  const data = await getPumpfunTrending();

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "s-maxage=60, stale-while-revalidate=30",
    },
  });
}
