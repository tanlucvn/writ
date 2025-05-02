"use client";

import { useAppStore } from "@/store/app-store";
import { AnimatePresence, motion } from "framer-motion";

export default function WordCount() {
  const { editor, currentWrite } = useAppStore();

  if (!editor) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentWrite?.id}
        initial={{ filter: "blur(4px)" }}
        animate={{ filter: "blur(0px)" }}
        transition={{
          duration: 0.4,
          ease: "easeInOut",
        }}
        className="w-full"
      >
        <span className="text-muted-foreground text-xs">{`${editor.storage.characterCount.characters()} words`}</span>
      </motion.div>
    </AnimatePresence>
  );
}
