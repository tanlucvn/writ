import { HeaderCard } from "../common/header-card";
import { Sidebar } from "../common/sidebar";
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

      <ScollToTop />

      {/* Dialog, Drawer, Sheet , ... */}
      <Settings />
      <WritesHistory />
    </>
  );
}
