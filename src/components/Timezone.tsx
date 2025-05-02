"use client";

import { useEffect, useRef, useState } from "react";

export default function Timezone({
  timezone,
  name,
}: {
  timezone: string;
  name: string;
}) {
  const [time, setTime] = useState("");
  const timeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-NZ", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    function updateTime() {
      setTime(formatter.format(new Date()));
    }

    function execute() {
      updateTime();
      timeout.current = setTimeout(
        execute,
        1000 - new Date().getMilliseconds(),
      );
    }

    execute();

    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  });

  return (
    <span>
      {name}: {time}
    </span>
  );
}
