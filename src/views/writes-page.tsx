"use client";

import Editor from "@/components/editor";
import { Toolbar } from "@/components/editor/toolbar";
import Loading from "@/components/loading";
import { Container, Item } from "@/components/motion";
import { useAppStore } from "@/store/app-store";

const WritesPage = () => {
  const { currentContent } = useAppStore();

  if (!currentContent) {
    return <Loading />;
  }

  return (
    <Container key={currentContent.id}>
      <Toolbar />

      <Item>
        <Editor />
      </Item>
    </Container>
  );
};

export default WritesPage;
