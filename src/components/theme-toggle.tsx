"use client";

import { CircleIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-full text-foreground transition-colors hover:bg-foreground/5"
            onClick={toggleTheme}
          >
            <CircleIcon className={theme === "dark" ? "fill-current" : ""} />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="flex items-center justify-center gap-2">
          <p>Toggle theme</p>
          <span className="rounded-sm bg-muted px-1 py-[2px] text-muted-foreground">
            Ctrl + M
          </span>
        </TooltipContent>
      </Tooltip>
    </>
  );
}
