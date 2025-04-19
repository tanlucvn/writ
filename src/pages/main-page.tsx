"use client";

import Header from "@/components/header";
import TextEditor from "@/components/text-editor";
import Toolbar from "@/components/toolbar";
import { createWrite, getLatestWrite, saveWrite } from "@/services/indexedDB";
import { useAppStore } from "@/store/app-store";
import { motion } from "framer-motion";
import { useCallback, useEffect } from "react";

export default function MainPage() {
  const { fontFamily, fontSize, isZenMode, currentWrite, setCurrentWrite } =
    useAppStore();

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

  if (!currentWrite) return <div>Loading...</div>;

  // console.log("currentWrite", currentWrite);

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
