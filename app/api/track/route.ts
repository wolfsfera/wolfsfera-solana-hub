import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(_request: NextRequest) {
  return new NextResponse(null, { status: 204 });
}

export async function POST(_request: NextRequest) {
  return new NextResponse(null, { status: 204 });
}
