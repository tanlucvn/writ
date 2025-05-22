import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import type * as React from "react";
import { cn } from "../../lib/utils";

interface TooltipProps {
  content: React.ReactNode;
  shortcut?: string;
  side?: "top" | "right" | "bottom" | "left";
  children: React.ReactNode;
  className?: string;
}

const WritePreviewTooltip = ({
  content,
  shortcut,
  side = "top",
  children,
  className,
}: TooltipProps) => {
  return (
    <TooltipPrimitive.Provider delayDuration={1000}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            className={cn(
              "fade-in-0 zoom-in-95 z-50 max-w-xs animate-in rounded-md bg-popover px-3 py-2 text-popover-foreground text-xs shadow-md",
              className,
            )}
          >
            <div className="flex items-center gap-2">
              <span>{content}</span>
              {shortcut && (
                <span className="ml-2 rounded border border-muted-foreground/20 bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                  {shortcut}
                </span>
              )}
            </div>
            <TooltipPrimitive.Arrow className="fill-popover" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};

export default WritePreviewTooltip;
