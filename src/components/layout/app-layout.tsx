import type React from "react";
import type { ReactNode } from "react";
import Toolbar from "../toolbar";

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {children}

      <Toolbar />
    </div>
  );
};

export default AppLayout;
