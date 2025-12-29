// SPDX-FileCopyrightText: 2025 SunnyMonster
//
// SPDX-License-Identifier: MIT

import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const latlong = request.nextUrl.searchParams.get("q");

  const result = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHERAPI_KEY}&q=${latlong}`,
  );

  const json = await result.json();

  const res = NextResponse.json(json);
  res.headers.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate",
  );

  return res;
}
