"use client";
import { Toolbar } from "@/components/editor/toolbar";
import Loading from "@/components/loading";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
  loading: () => <Loading />,
});

const WritesPage = () => {
  return (
    <>
      {/* <Container key={currentContent.id}> */}
      <Toolbar />

      {/* <Item> */}
      <Editor />
      {/* </Item> */}
      {/* </Container> */}
    </>
  );
};

export default WritesPage;
