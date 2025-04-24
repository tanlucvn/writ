"use client";

import Editor from "@/components/editor";
import Loading from "@/components/loading";
import { createWrite, getLatestWrite, saveWrite } from "@/services/db/writes";
import { useAppStore } from "@/store/app-store";
import { useCallback, useEffect } from "react";

export default function MainPage() {
  const { fontSize, fontFamily, currentWrite, setCurrentWrite } = useAppStore();

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

  if (!currentWrite) {
    return <Loading />;
  }

  return (
    <>
      <Editor />
    </>
  );
}
