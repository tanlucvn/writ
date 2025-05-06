import type { CommandItemProps } from "@/components/editor/extensions/slash-command/suggestions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CornerDownLeftIcon, LoaderIcon } from "lucide-react";

type CommandListItemProps = {
  item: CommandItemProps;
  index: number;
  selectedIndex: number;
  isLoading?: boolean;
  onSelect: (index: number) => void;
};

export const CommandListItem = ({
  item,
  index,
  selectedIndex,
  isLoading,
  onSelect,
}: CommandListItemProps) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        "h-12 w-full justify-between rounded-md px-3 py-2 text-sm",
        index === selectedIndex
          ? "bg-secondary text-secondary-foreground"
          : "hover:bg-secondary",
      )}
      onClick={() => onSelect(index)}
    >
      <div className="flex items-center gap-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-card text-secondary-foreground outline-double outline-2 outline-border outline-offset-2">
          {item.title === "Continue writing" && isLoading ? (
            <LoaderIcon className="h-4 w-4 animate-spin" />
          ) : (
            item.icon
          )}
        </div>
        <div className="flex flex-col text-left">
          <span className="font-medium text-sm">{item.title}</span>
          <span className="text-muted-foreground text-xs">
            {item.description}
          </span>
        </div>
      </div>
      {index === selectedIndex && (
        <CornerDownLeftIcon className="h-4 w-4 text-muted-foreground" />
      )}
    </Button>
  );
};
