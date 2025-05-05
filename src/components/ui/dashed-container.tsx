import { cn } from "@/lib/utils";
import type React from "react";

type DashedCardProps = React.HTMLAttributes<HTMLDivElement>;

const DashedContainer = ({
  className,
  children,
  ...props
}: DashedCardProps) => {
  return (
    <div
      className={cn(
        "size-full rounded-sm border-2 border-border border-dashed",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default DashedContainer;
