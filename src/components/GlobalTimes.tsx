// SPDX-FileCopyrightText: 2025 SunnyMonster
//
// SPDX-License-Identifier: MIT

"use client";

import { useSearchParams } from "next/navigation";
import CurrentTime from "./CurrentTime";
import Timezone from "./Timezone";

export default function GlobalTimes() {
  const params = useSearchParams();

  const tz = params.get("tz")?.split(",");

  return (
    <div className="text-ctp-text flex flex-col items-center gap-3">
      <CurrentTime />
      <div className="flex gap-10">
        {tz ? (
          tz?.map((tz) => {
            const comps = tz.split(":");

            const zone = comps[1].replaceAll("\\", "/");

            return <Timezone name={comps[0]} timezone={zone} key={comps[0]} />;
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
