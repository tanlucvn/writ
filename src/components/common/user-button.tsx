"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/store/auth-store";
import { useTabStore } from "@/store/tab-store";
import { useEffect } from "react";
import DashedContainer from "../ui/dashed-container";

const UserButton = () => {
  const { user, isLoading, fetchSession, logout } = useAuthStore();
  const { setTab } = useTabStore();

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  if (isLoading) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <div className="h-6 w-6 rounded-full bg-muted" />
      </Button>
    );
  }

  if (!user) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="h-fit px-0 py-0 text-foreground text-xs hover:bg-transparent"
        onClick={() => setTab("signin")}
      >
        Sign in
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-fit px-0 py-0 text-foreground text-xs outline-none ring-0 hover:bg-transparent focus-visible:ring-0"
        >
          Accounts
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" className="mt-1 w-48 p-1">
        <DashedContainer className="p-1">
          <div className="p-1.5 font-mono text-muted-foreground text-xs">
            {user.email}
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout} className="text-xs">
            Logout
          </DropdownMenuItem>
        </DashedContainer>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
