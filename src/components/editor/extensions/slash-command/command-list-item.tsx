import { cn } from "@/lib/utils";
import {} from "lucide-react";
import type { CommandItemProps } from "./suggestions";

type CommandListItemProps = {
  item: CommandItemProps;
  index: number;
  selectedIndex: number;
  onSelect: (index: number) => void;
};

export const CommandListItem = ({
  item,
  index,
  selectedIndex,
  onSelect,
}: CommandListItemProps) => {
  const isSelected = index === selectedIndex;

  return (
    <div
      // variant={isSelected ? "default" : "ghost"}
      className={cn(
        "flex select-none items-center gap-2 rounded-sm px-2 py-1.5 text-xs hover:bg-accent hover:text-accent-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0",
        isSelected && "!bg-primary !text-primary-foreground",
      )}
      onClick={() => onSelect(index)}
    >
      {item.icon}
      {item.title}
    </div>
  );
};
