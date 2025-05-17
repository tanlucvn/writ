import { cn } from "@/lib/utils";
import { TagIcon, X } from "lucide-react";
import type React from "react";

interface PillProps {
  label: string;
  color?: string;
  onClick?: () => void;
}

const Pill: React.FC<PillProps> = ({ label, color, onClick }) => {
  return (
    <div
      className={cn(
        "relative flex cursor-pointer select-none items-center gap-1 rounded-full border border-border px-2 py-0.5 text-foreground text-xs",
      )}
    >
      <TagIcon
        fill={color ? color : "#ffffff"}
        className="size-3 stroke-ring"
      />
      <span>{label}</span>
      {onClick && (
        <X
          size={14}
          className="cursor-pointer text-destructive opacity-100 transition-opacity hover:opacity-70"
          onClick={onClick}
        />
      )}
    </div>
  );
};

export default Pill;
