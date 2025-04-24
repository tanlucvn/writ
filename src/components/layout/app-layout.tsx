import { ScrollArea } from "@/components/ui/scroll-area";
import type React from "react";
import type { ReactNode } from "react";
import EditorToolbar from "../editor/editor-toolbar";
import WordCount from "../editor/word-count";
import MainMenu from "../main-menu";
import Settings from "../settings";
import WritesHistoryDrawer from "../writes/writes-history-drawer";

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <ScrollArea className="relative h-screen w-screen">
      {/* HEADER */}
      <section className="fixed top-0 left-0 z-10 grid w-screen grid-cols-5">
        <div className="flex items-center justify-start gap-4 p-4">
          <MainMenu />
        </div>
        <div className="col-span-3 flex items-center justify-center p-4">
          <EditorToolbar />
        </div>
        <div className="flex items-center justify-end p-4">
          <WritesHistoryDrawer />
        </div>
      </section>

      {/* CONTENT (BODY) */}
      {children}

      <WordCount />
      <Settings />
    </ScrollArea>
  );
};

export default AppLayout;
