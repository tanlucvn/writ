"use client";

import Editor from "@/components/editor";
import { Toolbar } from "@/components/editor/toolbar";
import FoldersNavigation from "@/components/folders/folders-navigation";

const WritesPage = () => {
  return (
    <>
      <div className="sticky top-0 z-[1] flex flex-col">
        <FoldersNavigation />
        <Toolbar />
      </div>
      <Editor />
    </>
  );
};

export default WritesPage;
