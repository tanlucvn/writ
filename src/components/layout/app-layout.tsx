import { HeaderCard } from "../common/header-card";
import { Sidebar } from "../common/sidebar";
import MusicPlayer from "../music-player";
import ScollToTop from "../scroll-to-top";
import Settings from "../settings";
import WritesHistory from "../writes/writes-history";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />

      <main className="flex w-screen items-center justify-center">
        <div className="flex min-h-dvh w-full flex-col items-center border-r border-l px-2 py-10 sm:w-[620px]">
          <HeaderCard />
          {children}
        </div>
      </main>

      <div className="fixed right-4 bottom-4 flex items-center justify-center gap-4">
        <ScollToTop />
      </div>

      {/* Dialog, Drawer, Sheet , ... */}
      <Settings />
      <WritesHistory />
      <MusicPlayer />
    </>
  );
}
