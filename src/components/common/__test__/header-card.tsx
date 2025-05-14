"use client";

import MainMenuV1 from "@/components/common/__test__/main-menu-v1";
import { cn } from "@/lib/utils";
import { useAppSettingsStore } from "@/store/app-settings-store";

const HeaderCard = () => {
  const { isZenMode } = useAppSettingsStore();

  return (
    <div className="flex w-full flex-col items-center justify-center space-y-4 border-b py-6">
      <MainMenuV1 />

      <div
        className={cn(
          "flex select-none flex-col items-center justify-center space-y-1",
          isZenMode && "hidden opacity-0 transition-all delay-75 duration-150",
        )}
      >
        <h1 className="font-bold text-sm">miniwrit</h1>
        <p className="text-muted-foreground text-xs">
          A clean, minimal app to write thoughts.
        </p>
      </div>
    </div>
  );
};

export default HeaderCard;
