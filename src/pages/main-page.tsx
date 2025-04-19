"use client";

import Header from "@/components/header";
import TextEditor from "@/components/text-editor";
import Toolbar from "@/components/toolbar";
import { useAppStore } from "@/store/app-store";
import { motion } from "framer-motion";

export default function MainPage() {
  const { isZenMode } = useAppStore();
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
