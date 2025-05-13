"use client";

import { useWritingSessionsStore } from "@/store/writing-sessions-store";
import { Lightbulb } from "lucide-react";
import { useEffect, useState } from "react";
import TimeDisplay from "../editor/time-display";
import SyncIndicator from "../sync-indicator";
import WritingSessionControls from "../writing-sessions/writing-session-controls";

const tips = [
  "Press Alt+S to open settings menu.",
  "Writing daily sharpens your thinking.",
  "Journaling helps you understand yourself.",
  "Don’t aim for perfect. Just begin.",
  "Focus on the first line — the rest will follow.",
];

const Footer = () => {
  const [tip, setTip] = useState("");
  const { remainingTime } = useWritingSessionsStore();

  useEffect(() => {
    setTip(tips[Math.floor(Math.random() * tips.length)]);
  }, []);

  const handleChangeTip = () => {
    setTip(tips[Math.floor(Math.random() * tips.length)]);
  };

  return (
    <footer className="-translate-x-1/2 absolute bottom-[5.5px] left-1/2 flex h-8 w-[95%] transform items-center justify-between border-t bg-background py-1.5 text-center text-muted-foreground text-xs">
      {remainingTime ? (
        <WritingSessionControls />
      ) : (
        <>
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
        </>
      )}
    </footer>
  );
};

export default Footer;
