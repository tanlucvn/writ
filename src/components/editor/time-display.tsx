"use client";

import { useEffect, useState } from "react";

export default function TimeDisplay() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const formattedHours = hours % 12 || 12; // 12-hour format
      const amPm = hours >= 12 ? "PM" : "AM";
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

      setTime(`${formattedHours}:${formattedMinutes} ${amPm}`);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return <div className="text-xs">{time}</div>;
}
