"use client";

import TextEditor from "@/components/editor/text-editor";
import Header from "@/components/header";
import Loading from "@/components/loading";
import Toolbar from "@/components/toolbar";
import { createWrite, getLatestWrite, saveWrite } from "@/services/indexedDB";
import { useAppStore } from "@/store/app-store";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useCallback, useEffect } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { toast } from "sonner";

export default function MainPage() {
  const {
    fontFamily,
    fontSize,
    isZenMode,
    currentWrite,
    setCurrentWrite,
    toggleZenMode,
    refreshWrites,
  } = useAppStore();
  const { theme, setTheme } = useTheme();

  const initializeWrite = useCallback(async () => {
    try {
      const recent = await getLatestWrite();
      const write = recent ?? createWrite(fontFamily, fontSize);
      if (!recent) await saveWrite(write);
      setCurrentWrite(write);
    } catch (err) {
      console.error("Failed to init write:", err);
    }
  }, [fontFamily, fontSize, setCurrentWrite]);

  useEffect(() => {
    initializeWrite();
  }, [initializeWrite]);

  const handleCreate = async () => {
    const write = createWrite(fontFamily, fontSize);
    await saveWrite(write);
    setCurrentWrite(write);
    refreshWrites();
    toast.success("New write created successfully!");
  };

  // Keyboard shortcuts
  useHotkeys("ctrl+m", () => setTheme(theme === "dark" ? "light" : "dark"));
  useHotkeys("ctrl+b", toggleZenMode);
  useHotkeys("alt+n", handleCreate);

  if (!currentWrite) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      <TextEditor />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isZenMode ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <Toolbar />
      </motion.div>
    </>
  );
}
