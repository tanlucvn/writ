import { AnimatedNumberBadge } from "@/components/animated-number-badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Write } from "@/types";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";
import WriteItem from "../../../writes/write-item";

type SectionProps = {
  icon: React.ReactNode;
  title: string;
  items: Write[];
  collapsed?: boolean;
};

const WritesSection = ({
  icon,
  title,
  items,
  collapsed = false,
}: SectionProps) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  if (items.length === 0) return null;

  return (
    <>
      <div
        className="group mb-2 flex cursor-pointer items-center justify-between"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div
          className={cn(
            "flex items-center gap-2 font-medium text-foreground text-sm group-hover:text-foreground",
            isCollapsed && "text-muted-foreground",
          )}
        >
          <span
            className={cn(
              "flex size-8 items-center justify-center rounded-md border p-1",
              !isCollapsed && "bg-secondary",
            )}
          >
            {icon}
          </span>
          {title}
          <AnimatedNumberBadge
            value={items.length}
            className="ring-ring group-hover:ring-1"
          />
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="size-6 px-2 py-0.5 text-muted-foreground text-xs hover:bg-transparent group-hover:text-foreground"
        >
          {isCollapsed ? <ChevronRightIcon /> : <ChevronDownIcon />}
        </Button>
      </div>

      {!isCollapsed && (
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
          {items.map((write) => (
            <WriteItem key={write.id} write={write} />
          ))}
        </div>
      )}
    </>
  );
};

export default WritesSection;
