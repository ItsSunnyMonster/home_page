import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const latlong = request.nextUrl.searchParams.get("q");

  let result = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHERAPI_KEY}&q=${latlong}`,
  );

  let json = await result.json();

  let res = NextResponse.json(json);
  res.headers.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate",
  );

  return res;
}
