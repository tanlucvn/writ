"use client";
import Editor from "@/components/editor";
import BubbleToolbar from "@/components/editor/bubble-toolbar";
import EditorToolbar from "@/components/editor/editor-toolbar";
import Loading from "@/components/loading";
import { createWrite, getLatestWrite, saveWrite } from "@/services/db/writes";
import { useAppSettingsStore } from "@/store/app-settings-store";
import { useAppStore } from "@/store/app-store";
import { useCallback, useEffect } from "react";

export default function MainPage() {
  const { currentWrite, setCurrentWrite, initDB, editorMode } = useAppStore();
  const { fontSize, fontFamily } = useAppSettingsStore();

  const initializeData = useCallback(async () => {
    try {
      await initDB();

      const recent = await getLatestWrite();
      const write = recent ?? createWrite(fontFamily, fontSize);
      if (!recent) await saveWrite(write);
      setCurrentWrite(write);
    } catch (err) {
      console.error("Failed to initialize data:", err);
    }
  }, [fontFamily, fontSize, initDB, setCurrentWrite]);

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  if (!currentWrite) {
    return <Loading />;
  }

  return (
    <>
      {editorMode === "bubble" ? <BubbleToolbar /> : <EditorToolbar />}
      <Editor />
    </>
  );
}
