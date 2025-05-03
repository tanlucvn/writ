"use client";

import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/app-store";
import { MoveLeftIcon, MoveRightIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const RightBar = () => {
  const { writes, currentContent, setCurrentContent } = useAppStore();

  const handlePrev = () => {
    if (!currentContent || writes.length === 0) return;
    const index = writes.findIndex((w) => w.id === currentContent.id);
    if (index > 0) {
      const prev = writes[index - 1];
      setCurrentContent(prev);
    }
  };

  const handleNext = () => {
    if (!currentContent || writes.length === 0) return;
    const index = writes.findIndex((w) => w.id === currentContent.id);
    if (index < writes.length - 1) {
      const next = writes[index + 1];
      setCurrentContent(next);
    }
  };
  return (
    <aside
      className={cn(
        "fixed top-[42px] right-1/2 bottom-[40px] flex w-[120px] translate-x-[470px] flex-col justify-between text-xs",
      )}
    >
      {/* Top content */}
      <div className="flex flex-col items-start space-y-4 text-muted-foreground">
        {/* <p>RightBar Content</p> */}
      </div>

      {/* Bottom content */}
      <div className="flex flex-col items-start">
        <div className="flex items-center justify-center gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                size="sm"
                className="h-4 text-muted-foreground text-xs outline-double outline-2 outline-border outline-offset-2"
                onClick={handlePrev}
                disabled={
                  !currentContent ||
                  writes.findIndex((w) => w.id === currentContent.id) === 0
                }
              >
                <MoveLeftIcon />
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
                className="h-4 text-muted-foreground text-xs outline-double outline-2 outline-border outline-offset-2"
                onClick={handleNext}
                disabled={
                  !currentContent ||
                  writes.findIndex((w) => w.id === currentContent.id) ===
                    writes.length - 1
                }
              >
                <MoveRightIcon />
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
