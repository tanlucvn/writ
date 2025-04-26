import { HeaderCard } from "../common/header-card";
import { Sidebar } from "../common/sidebar";
import EditorToolbar from "../editor/editor-toolbar";
import Settings from "../settings";
import WritesHistory from "../writes/writes-history";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />

      <main className="flex w-screen items-center justify-center">
        <div className="flex min-h-dvh w-full flex-col items-center border-r border-l px-2 py-10 sm:w-[620px]">
          <HeaderCard />
          <EditorToolbar />
          {children}
        </div>
      </main>

      {/* Dialog, Drawer, Sheet , ... */}
      <Settings />
      <WritesHistory />
    </>
  );
}
