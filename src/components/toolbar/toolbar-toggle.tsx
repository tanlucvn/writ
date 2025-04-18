import { Button } from "@/components/ui/button";
import { Tooltip } from "@radix-ui/react-tooltip";
import { ArrowUpIcon } from "lucide-react";
import { TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function ToolbarToggle() {
  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-full text-foreground transition-colors hover:bg-foreground/5"
          >
            <ArrowUpIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="flex items-center justify-center gap-2">
          <p>Show toolbar</p>
          <span className="rounded-sm bg-muted px-1 py-[2px] text-muted-foreground">
            Ctrl + N
          </span>
        </TooltipContent>
      </Tooltip>
    </>
  );
}
