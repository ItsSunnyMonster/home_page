"use client";

import { useEffect, useRef, useState } from "react";

export default function CurrentTime() {
  const [time, setTime] = useState("");
  const timeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    function updateTime() {
      setTime(new Date().toLocaleTimeString());
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

  return <span className="text-ctp-yellow font-bold">Local: {time}</span>;
}
