"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { TabOption } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type TabsProps = {
  tabs: TabOption[];
  className?: string;
  scrollAreaClassName?: string;
  onTabChange?: (label: string) => void;
};

const AnimatedTabs = ({ tabs, className, scrollAreaClassName }: TabsProps) => {
  const [tab, setTab] = useState(tabs[0]?.label);

  const activeTab = tabs.find((t) => t.label === tab);

  return (
    <div className={cn("w-full space-y-4", className)}>
      {/* Tabs */}
      <div className="relative flex w-full items-center justify-evenly gap-0 rounded-full border border-input bg-muted">
        {tabs.map((tabItem) => {
          const isActive = tab === tabItem.label;
          return (
            <Button
              key={tabItem.label}
              variant="ghost"
              onClick={() => setTab(tabItem.label)}
              className={cn(
                "relative z-10 w-full max-w-[200px] shrink rounded-full bg-transparent text-muted-foreground text-sm hover:bg-transparent",
                isActive && "!text-primary-foreground",
              )}
            >
              {tabItem.icon}
              {isActive && <span>{tabItem.label}</span>}
              {isActive && (
                <motion.div
                  layoutId="highlight"
                  transition={{
                    type: "spring",
                    bounce: 0.01,
                    duration: 0.4,
                  }}
                  className="-z-10 absolute inset-0 rounded-full bg-primary"
                />
              )}
            </Button>
          );
        })}
      </div>

      {/* Content */}
      <ScrollArea
        id="block-scrollarea"
        className={cn("h-[350px] w-full", scrollAreaClassName)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="h-full px-2 text-foreground"
          >
            {activeTab?.content}
          </motion.div>
        </AnimatePresence>
      </ScrollArea>
    </div>
  );
};

export default AnimatedTabs;
