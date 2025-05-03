"use client";

import { Editor } from "@/components/editor";
import BubbleToolbar from "@/components/editor/bubble-toolbar";
import EditorToolbar from "@/components/editor/editor-toolbar";
import Loading from "@/components/loading";
import { useAppStore } from "@/store/app-store";
import { AnimatePresence, motion } from "framer-motion";

const WritesPage = () => {
  const { currentContent, editorMode } = useAppStore();

  if (!currentContent) {
    return <Loading />;
  }

  return (
    <>
      {editorMode === "bubble" ? <BubbleToolbar /> : <EditorToolbar />}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentContent.id}
          initial={{ filter: "blur(4px)" }}
          animate={{ filter: "blur(0px)" }}
          transition={{
            duration: 0.4,
            ease: "easeInOut",
          }}
          className="w-full"
        >
          <Editor />
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default WritesPage;
