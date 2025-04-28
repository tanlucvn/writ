"use client";

import { cn } from "@/lib/utils";
import { useAppSettingsStore } from "@/store/app-settings-store";
import { MainMenu } from "./main-menu";

export function HeaderCard() {
  const { isZenMode } = useAppSettingsStore();

  return (
    <div className="flex w-full flex-col items-center justify-center space-y-4 border-b pb-10">
      <MainMenu />

      <div
        className={cn(
          "flex flex-col items-center justify-center space-y-1",
          isZenMode && "hidden opacity-0 transition-all delay-75 duration-150",
        )}
      >
        <h1 className="font-bold font-outfit text-sm">miniwrit</h1>
        <p className="text-muted-foreground text-xs">
          A clean, minimal app to write thoughts.
        </p>
      </div>
    </div>
  );
}
