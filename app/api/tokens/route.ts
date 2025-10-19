import { NextResponse } from "next/server";
import { getTokensBrief } from "@/lib/data/solana";

export const revalidate = 60;

export async function GET() {
  const data = await getTokensBrief();

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "s-maxage=60, stale-while-revalidate=30",
    },
  });
}
