import { NumberFlow } from "@/components/number-flow";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type AnimatedNumberBadgeProps = Omit<BadgeProps, "children"> & {
  value: number;
};

export function AnimatedNumberBadge({
  value,
  className,
  variant = "secondary",
  ...props
}: AnimatedNumberBadgeProps) {
  return (
    <Badge variant={variant} className={cn(className)} {...props}>
      <NumberFlow value={value} />
    </Badge>
  );
}
