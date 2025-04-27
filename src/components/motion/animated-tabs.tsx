"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export type TabOption = {
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: TabOption[];
  className?: string;
  scrollAreaClassName?: string;
  onTabChange?: (label: string) => void;
};

export default function Tabs({
  tabs,
  className,
  scrollAreaClassName,
}: TabsProps) {
  const [tab, setTab] = useState(tabs[0]?.label);

  const activeTab = tabs.find((t) => t.label === tab);

  return (
    <div className={cn("my-4 w-full space-y-4 p-4", className)}>
      {/* Tabs */}
      <div className="relative flex w-full items-center justify-evenly gap-0 rounded-full bg-primary/5">
        {tabs.map((tabItem) => {
          const isActive = tab === tabItem.label;
          return (
            <Button
              key={tabItem.label}
              variant="ghost"
              onClick={() => setTab(tabItem.label)}
              className={cn(
                "relative z-10 w-full max-w-[200px] rounded-full bg-transparent text-muted-foreground text-xs hover:bg-transparent",
                isActive && "text-foreground",
              )}
            >
              {tabItem.icon}
              {isActive && <span>{tabItem.label}</span>}
              {isActive && (
                <motion.div
                  layoutId="highlight"
                  transition={{
                    type: "spring",
                    bounce: 0.2,
                    duration: 0.4,
                  }}
                  className="-z-10 absolute inset-0 rounded-full bg-primary/10"
                />
              )}
            </Button>
          );
        })}
      </div>

      {/* Content */}
      <ScrollArea className={cn("h-[350px] w-full", scrollAreaClassName)}>
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="px-2 text-foreground"
          >
            {activeTab?.content}
          </motion.div>
        </AnimatePresence>
      </ScrollArea>
    </div>
  );
}
