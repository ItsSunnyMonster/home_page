// SPDX-FileCopyrightText: 2025 SunnyMonster
//
// SPDX-License-Identifier: MIT

"use client";

import { useEffect, useRef, useState } from "react";

export default function TimeOfDay() {
  const [currentTimeOfDay, setCurrentTimeOfDay] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  function update() {
    const now = new Date();
    now.setSeconds(now.getSeconds() + 3);

    const hours = now.getHours();

    if (hours >= 0 && hours < 12) {
      setCurrentTimeOfDay("Morning");
    } else if (hours >= 12 && hours < 17) {
      setCurrentTimeOfDay("Afternoon");
    } else {
      setCurrentTimeOfDay("Evening");
    }
  }

  useEffect(() => {
    function runAtFullHour(callback: () => void) {
      function execute() {
        const now = new Date();
        const delay =
          (60 - now.getMinutes()) * 60 * 1000 -
          now.getSeconds() * 1000 -
          now.getMilliseconds();
        timeoutRef.current = setTimeout(() => {
          callback();
          execute();
        }, delay);
      }
      execute();
    }
    update();
    runAtFullHour(update);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const gradientStops: { [time: string]: string } = {
    Morning: "from-ctp-red via-ctp-peach to-ctp-red",
    Afternoon: "from-ctp-green via-ctp-yellow to-ctp-green",
    Evening: "from-ctp-blue via-ctp-sapphire to-ctp-blue",
  };

  const afterGradientStops: { [time: string]: string } = {
    Morning: "after:from-ctp-red after:via-ctp-peach after:to-ctp-red",
    Afternoon: "after:from-ctp-green after:via-ctp-yellow after:to-ctp-green",
    Evening: "after:from-ctp-blue after:via-ctp-sapphire after:to-ctp-blue",
  };

  const underlineWidths: { [time: string]: string } = {
    Morning: "after:w-[83%]",
    Afternoon: "after:w-[100%]",
    Evening: "after:w-[82%]",
  };

  return (
    <span
      className={`
        bg-gradient-to-r ${gradientStops[currentTimeOfDay]} bg-size-[150%] animate-gradient-scroll text-transparent bg-clip-text relative
        after:absolute after:left-0 after:bottom-[4%] after:h-[0.08em] ${underlineWidths[currentTimeOfDay]}
      after:bg-gradient-to-r after:bg-size-[150%] after:animate-gradient-scroll ${afterGradientStops[currentTimeOfDay]}
    `}
    >
      {currentTimeOfDay}
    </span>
  );
}
