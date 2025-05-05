"use client";

import { Editor } from "@/components/editor";
import BubbleToolbar from "@/components/editor/bubble-toolbar";
import EditorToolbar from "@/components/editor/editor-toolbar";
import Loading from "@/components/loading";
import { Container, Item } from "@/components/motion";
import { useAppStore } from "@/store/app-store";

const WritesPage = () => {
  const { currentContent, editorMode } = useAppStore();

  if (!currentContent) {
    return <Loading />;
  }

  return (
    <Container key={currentContent.id} className="size-full">
      <Item className="flex w-full items-center justify-center">
        {editorMode === "bubble" ? <BubbleToolbar /> : <EditorToolbar />}
      </Item>

      <Item>
        <Editor />
      </Item>
    </Container>
  );
};

export default WritesPage;
