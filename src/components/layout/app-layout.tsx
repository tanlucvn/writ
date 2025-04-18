import Header from "@/components/header";
import Toolbar from "@/components/toolbar";
import type React from "react";
import type { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Header />
      {children}

      <Toolbar />
    </div>
  );
};

export default AppLayout;
