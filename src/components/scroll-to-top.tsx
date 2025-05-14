"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type ScrollToTopProps = {
  className?: string;
  showTrigger?: number;
};

export default function ScrollToTop({
  className,
  showTrigger = 300,
}: ScrollToTopProps) {
  const [visible, setVisible] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = document.querySelector(".scrollable-content");
    if (!container) return;

    scrollContainerRef.current = container as HTMLDivElement;

    const handleScroll = () => {
      setVisible(scrollContainerRef.current!.scrollTop > showTrigger);
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [showTrigger]);

  const handleClick = () => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 10 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            size="icon"
            variant="secondary"
            onClick={handleClick}
            className={cn(
              "size-6 border outline-2 outline-border outline-offset-2",
              className,
            )}
          >
            <ArrowUpIcon className="size-3.5" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
