"use client";

import { ToolbarColor } from "@/components/editor/toolbar/toolbar-color";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/app-store";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ToolbarFormat } from "./toolbar-format";

export const Toolbar = () => {
  const { editor } = useAppStore();
  const [isToolbarVisible, setIsToolbarVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!editor) return;

    const handleUpdate = () => {
      const { from, to } = editor.state.selection;
      const isTextSelected = from !== to;
      setIsToolbarVisible(isTextSelected);
    };

    editor.on("selectionUpdate", handleUpdate);
    editor.on("transaction", handleUpdate);

    return () => {
      editor.off("selectionUpdate", handleUpdate);
      editor.off("transaction", handleUpdate);
    };
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="fixed right-0 bottom-0 left-0 z-10 mx-auto flex flex-col items-center md:bottom-8">
      {isMobile ? (
        // Mobile
        <div
          className={cn(
            "flex h-9 items-center gap-0 p-0.5",
            "w-full rounded-lg border bg-card shadow-md",
          )}
        >
          <ToolbarFormat />
          <ToolbarColor />
        </div>
      ) : (
        // Desktop
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: isToolbarVisible ? 1 : 0,
            y: isToolbarVisible ? 0 : 30,
          }}
          transition={{ duration: 0.2 }}
          className={cn(
            "flex h-9 items-center gap-0 p-0.5 transition-all ease-out md:h-8 md:p-0",
            "outline-1 outline-border outline-offset-2 md:outline-double",
            "w-full rounded-tl-md rounded-tr-md border border-t bg-card",
            "md:w-auto md:rounded-lg md:border",
          )}
        >
          <ToolbarFormat />
          <ToolbarColor />
        </motion.div>
      )}
    </div>
  );
};
