import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";

type NumberFlowBadgeProps = {
  value: number;
  className?: string;
  variant?: "default" | "secondary" | "destructive" | "outline";
};

export function NumberFlowBadge({
  value,
  className,
  variant = "secondary",
}: NumberFlowBadgeProps) {
  return (
    <Badge
      variant={variant}
      className={cn("select-none px-2 font-medium", className)}
    >
      <NumberFlow value={value} />
    </Badge>
  );
}
