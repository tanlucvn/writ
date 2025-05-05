"use client";

import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/app-store";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import UserButton from "./user-button";

const RightBar = () => {
  const { writes, currentContent, handlePrevWrite, handleNextWrite } =
    useAppStore();

  return (
    <aside
      className={cn(
        "fixed top-[42px] right-1/2 bottom-[40px] flex w-[120px] translate-x-[470px] flex-col justify-between text-xs",
      )}
    >
      {/* Top content */}
      <div className="flex flex-col items-start space-y-4 text-muted-foreground">
        <UserButton />
      </div>

      {/* Bottom content */}
      <div className="flex flex-col items-start">
        <div className="flex items-center justify-center gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                size="sm"
                className="size-6 text-muted-foreground text-xs outline-double outline-2 outline-border outline-offset-2"
                onClick={handlePrevWrite}
                disabled={
                  !currentContent ||
                  writes.findIndex((w) => w.id === currentContent.id) === 0
                }
              >
                <ChevronLeftIcon strokeWidth={3} />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="mb-1">
              <p>Go to previous write</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                size="sm"
                className="size-6 text-muted-foreground text-xs outline-double outline-2 outline-border outline-offset-2"
                onClick={handleNextWrite}
                disabled={
                  !currentContent ||
                  writes.findIndex((w) => w.id === currentContent.id) ===
                    writes.length - 1
                }
              >
                <ChevronRightIcon strokeWidth={3} />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="mb-1">
              <p>Go to next write</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </aside>
  );
};

export default RightBar;
