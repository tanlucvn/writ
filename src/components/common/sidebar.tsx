"use client";

import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/app-store";
import { type Tab, useTabStore } from "@/store/tab-store";
import TimeDisplay from "../editor/time-display";
import WordCount from "../editor/word-count";
import { Button } from "../ui/button";
import { UserButton } from "./user-button";

export function Sidebar() {
  const { tab, setTab } = useTabStore();
  const { isZenMode } = useAppStore();

  const tabs = [
    { label: "Writes", value: "writes" },
    { label: "About", value: "about" },
    { label: "Privacy", value: "privacy" },
  ];

  return (
    <nav
      className={cn(
        "-translate-x-[470px] fixed top-[42px] bottom-[40px] left-1/2 flex w-[120px] transform flex-col justify-between p-4",
        isZenMode &&
          "pointer-events-none opacity-0 transition-all delay-75 duration-150",
      )}
    >
      <div className="flex flex-col items-start space-y-2 text-xs">
        {tabs.map((item) => (
          <Button
            variant="ghost"
            size="sm"
            key={item.value}
            onClick={() => setTab(item.value as Tab)}
            className={cn(
              "h-fit px-0 py-0 text-muted-foreground text-xs outline-none ring-0 hover:bg-transparent focus-visible:ring-0",
              tab === item.value && "text-foreground",
            )}
          >
            {item.label}
          </Button>
        ))}
      </div>

      <div className="flex select-none flex-col items-start space-y-2 text-muted-foreground text-xs">
        <UserButton />

        <TimeDisplay />
        <WordCount />
      </div>
    </nav>
  );
}
