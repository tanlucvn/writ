"use client";

import { cn } from "@/lib/utils";
import { useAppSettingsStore } from "@/store/app-settings-store";
import ScrollToTop from "../scroll-to-top";

const RightBar = () => {
  const { isZenMode } = useAppSettingsStore();

  return (
    <aside className="sticky top-4 hidden h-full w-full max-w-[200px] shrink-0 lg:block">
      <div
        className={cn(
          "flex h-full flex-col justify-between pt-4 pb-3",
          isZenMode && "pointer-events-none opacity-0",
        )}
      >
        <div />

        <ScrollToTop />
      </div>
    </aside>
  );
};

export default RightBar;
