"use client";

import Editor from "@/components/editor";
import BubbleToolbar from "@/components/editor/bubble-toolbar";
import EditorToolbar from "@/components/editor/editor-toolbar";
import Loading from "@/components/loading";
import { useAppStore } from "@/store/app-store";

export default function MainPage() {
  const { currentWrite, editorMode } = useAppStore();

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
