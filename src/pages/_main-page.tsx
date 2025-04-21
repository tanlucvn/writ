"use client";

import TextEditor from "@/components/editor/text-editor";
import Header from "@/components/header";
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
      // Get latest write from IndexedDB
      const recentWrite = await getLatestWrite();
      if (recentWrite) {
        setCurrentWrite(recentWrite);
      } else {
        const newWrite = createWrite(fontFamily, fontSize);
        await saveWrite(newWrite);
        setCurrentWrite(newWrite);
      }
    } catch (error) {
      console.error("Error initializing write:", error);
    }
  }, [fontFamily, fontSize, setCurrentWrite]);

  useEffect(() => {
    initializeWrite();
  }, [initializeWrite]);

  const handleCreate = async () => {
    const newWrite = createWrite();
    await saveWrite(newWrite);

    toast.success("New write created successfully!");
    refreshWrites();
  };

  useHotkeys("ctrl+m", () => setTheme(theme === "dark" ? "light" : "dark"));
  useHotkeys("ctrl+b", () => toggleZenMode());
  useHotkeys("ctrl+n", () => handleCreate());

  if (!currentWrite) return <div>Loading...</div>;

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
