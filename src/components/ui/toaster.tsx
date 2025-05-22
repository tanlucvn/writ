"use client";

import {
  CheckIcon,
  InfoIcon,
  LoaderIcon,
  TriangleAlertIcon,
  XIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: (
          <span className="flex size-6 items-center justify-center rounded-sm border bg-secondary outline-double outline-1 outline-border outline-offset-2">
            <CheckIcon className="size-4" />
          </span>
        ),
        error: (
          <span className="flex size-6 items-center justify-center rounded-sm border bg-secondary outline-double outline-1 outline-border outline-offset-2">
            <XIcon className="size-4" />
          </span>
        ),
        loading: (
          <span className="flex size-6 items-center justify-center rounded-sm border bg-secondary outline-double outline-1 outline-border outline-offset-2">
            <LoaderIcon className="size-4" />
          </span>
        ),
        info: (
          <span className="flex size-6 items-center justify-center rounded-sm border bg-secondary outline-double outline-1 outline-border outline-offset-2">
            <InfoIcon className="size-4" />
          </span>
        ),
        warning: (
          <span className="flex size-6 items-center justify-center rounded-sm border bg-secondary outline-double outline-1 outline-border outline-offset-2">
            <TriangleAlertIcon className="size-4" />
          </span>
        ),
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          title: "ml-2 font-medium text-xs select-none",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
