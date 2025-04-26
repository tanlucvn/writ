"use client";

import { Button } from "@/components/ui/button"; // chỉnh path nếu cần
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpIcon } from "lucide-react";
import { useEffect, useState } from "react";

type ScrollToTopProps = {
  className?: string;
  showTrigger?: number;
};

export default function ScrollToTop({
  className,
  showTrigger = 300,
}: ScrollToTopProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > showTrigger);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showTrigger]);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="fixed right-4 bottom-4"
        >
          <Button
            size="icon"
            variant="secondary"
            onClick={handleClick}
            className={cn(
              "size-8 border outline-2 outline-border outline-offset-2",
              className,
            )}
          >
            <ArrowUpIcon className="h-5 w-5" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
