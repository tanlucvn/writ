"use client";
import { Lightbulb } from "lucide-react";
import { useEffect, useState } from "react";
import TimeDisplay from "../editor/time-display";
import SyncIndicator from "../sync-indicator";

const tips = [
  "Press Alt+S to open settings menu.",
  "Writing daily sharpens your thinking.",
  "Journaling helps you understand yourself.",
  "Don’t aim for perfect. Just begin.",
  "Focus on the first line — the rest will follow.",
];

const Tips = () => {
  const [tip, setTip] = useState("");

  useEffect(() => {
    setTip(tips[Math.floor(Math.random() * tips.length)]);
  }, []);

  const handleChangeTip = () => {
    setTip(tips[Math.floor(Math.random() * tips.length)]);
  };

  return (
    <div className="flex w-full items-center justify-between text-muted-foreground text-xs">
      <span
        className="flex cursor-pointer select-none items-center justify-center gap-1"
        onClick={handleChangeTip}
      >
        <Lightbulb size={14} className="text-yellow-500" />
        <span>{tip || "…"}</span>
      </span>

      <div className="flex items-center justify-center gap-2">
        <SyncIndicator />
        <TimeDisplay />
      </div>
    </div>
  );
};

export default Tips;
