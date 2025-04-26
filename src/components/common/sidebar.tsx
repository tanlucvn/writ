"use client";

import { cn } from "@/lib/utils";
import { type Tab, useTabStore } from "@/store/tab-store";
import TimeDisplay from "../editor/time-display";
import WordCount from "../editor/word-count";
import { Button } from "../ui/button";

export function Sidebar() {
  const { tab, setTab } = useTabStore();

  const tabs = [
    { label: "Writes", value: "writes" },
    { label: "About", value: "about" },
    { label: "Privacy", value: "privacy" },
  ];

  return (
    <nav className="-translate-x-[470px] fixed top-[42px] bottom-[40px] left-1/2 flex w-[120px] transform flex-col justify-between p-4">
      <div className="flex flex-col items-start space-y-2 text-xs">
        {tabs.map((item) => (
          <Button
            variant="ghost"
            size="sm"
            key={item.value}
            onClick={() => setTab(item.value as Tab)}
            className={cn(
              "h-fit px-0 py-0 text-muted-foreground text-xs hover:bg-transparent",
              tab === item.value && "text-foreground",
            )}
          >
            {item.label}
          </Button>
        ))}
      </div>

      <div className="flex select-none flex-col items-start space-y-2 text-muted-foreground text-xs">
        <TimeDisplay />
        <WordCount />
      </div>
    </nav>
  );
}
