"use client";

import { cn } from "@/lib/utils";
import { useAppSettingsStore } from "@/store/app-settings-store";
import ScrollToTop from "../scroll-to-top";
import WritingSessionControls from "../writing-sessions/writing-session-controls";

const RightBar = () => {
  const { isZenMode } = useAppSettingsStore();

  return (
    <aside className="sticky top-4 hidden h-full w-full max-w-[200px] shrink-0 sm:block">
      <div
        className={cn(
          "flex h-full flex-col justify-between pt-4 pb-2",
          isZenMode && "pointer-events-none opacity-0",
        )}
      >
        <div>
          <WritingSessionControls />
        </div>

        <ScrollToTop />
      </div>
    </aside>
  );
};

export default RightBar;
