"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useAppSettingsStore } from "@/store/app-settings-store";
import { useTabStore } from "@/store/tab-store";
import { CircleIcon, Info, Lock, Pen } from "lucide-react";
import { useCallback, useState } from "react";
import { Separator } from "../ui/separator";
import UserButton from "./user-button";

const tabs = [
  { key: "writes", label: "Writes", icon: <Pen size={16} /> },
  { key: "about", label: "About", icon: <Info size={16} /> },
  { key: "privacy", label: "Privacy", icon: <Lock size={16} /> },
] as const;

const Sidebar = () => {
  const { tab, setTab } = useTabStore();
  const { isZenMode } = useAppSettingsStore();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const renderButton = useCallback(
    (key: string, label: string, icon: React.ReactNode, active: boolean) => (
      <Button
        variant={active ? "secondary" : "ghost"}
        size="sm"
        className={cn(
          "flex w-full items-center justify-start space-x-2 text-muted-foreground text-xs hover:bg-transparent",
          isCollapsed && "ml-auto size-8 justify-center",
          active &&
            "text-foreground outline-double outline-1 outline-border outline-offset-2 hover:bg-secondary",
        )}
        onClick={() => setTab(key as any)}
      >
        {icon}
        {!isCollapsed && label}
      </Button>
    ),
    [isCollapsed, setTab],
  );

  return (
    <aside className="sticky top-0 hidden h-screen w-full max-w-[200px] shrink-0 sm:block">
      <div
        className={cn(
          "flex h-full flex-col justify-between pt-4 pb-1",
          isZenMode && "pointer-events-none opacity-0",
        )}
      >
        <div
          className={cn(
            "flex flex-col gap-2",
            isCollapsed ? "items-center px-1" : "px-2",
          )}
        >
          <UserButton isCollapsed={isCollapsed} />

          <Separator className={isCollapsed ? "ml-auto w-8" : ""} />

          {tabs.map(({ key, label, icon }) =>
            isCollapsed ? (
              <Tooltip key={key}>
                <TooltipTrigger asChild>
                  {renderButton(key, label, icon, tab === key)}
                </TooltipTrigger>
                <TooltipContent side="right">{label}</TooltipContent>
              </Tooltip>
            ) : (
              <div key={key}>{renderButton(key, label, icon, tab === key)}</div>
            ),
          )}
        </div>

        <div
          className={cn(
            "flex flex-col gap-2",
            isCollapsed ? "items-center px-1" : "px-2",
          )}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                size="sm"
                className="ml-auto flex size-8 items-center justify-center space-x-2 bg-transparent text-muted-foreground text-xs hover:bg-transparent"
                onClick={() => setIsCollapsed((prev) => !prev)}
              >
                <CircleIcon
                  className={cn("size-4", isCollapsed && "fill-current")}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Mini sidebar</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
