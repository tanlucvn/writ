"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CircleIcon, Minus } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer grid size-3.5 shrink-0 place-content-center rounded-sm border-none outline-double outline-1 outline-border outline-offset-1 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-secondary data-[state=checked]:outline-primary/10",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="text-current [&>:first-child]:data-[state=indeterminate]:hidden [&>:last-child]:data-[state=checked]:hidden">
      <CircleIcon className="size-2 fill-current" />
      <Minus className="size-2.5" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
