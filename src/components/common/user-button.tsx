"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useTabStore } from "@/store/tab-store";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { ArrowDownRightIcon, ArrowUpRightIcon, LoaderIcon } from "lucide-react";
import DashedContainer from "../ui/dashed-container";

const UserButton = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const { isSignedIn, user, isLoaded } = useUser();
  const { tab, setTab } = useTabStore();

  const active = tab === "signin";

  if (!isLoaded) {
    return (
      <Button
        variant="secondary"
        size="sm"
        className={cn(
          "flex w-full items-center justify-start space-x-2 text-muted-foreground text-xs",
          isCollapsed && "ml-auto size-8 justify-center",
        )}
        disabled
      >
        <LoaderIcon />
      </Button>
    );
  }

  if (!isSignedIn) {
    return (
      <Button
        variant={active ? "secondary" : "ghost"}
        size="sm"
        className={cn(
          "flex w-full items-center justify-start space-x-2 text-muted-foreground text-xs hover:bg-transparent",
          isCollapsed && "ml-auto size-8 justify-center",
          active &&
            "text-foreground outline-double outline-1 outline-border outline-offset-2 hover:bg-secondary",
        )}
        onClick={() => setTab("signin")}
      >
        <ArrowUpRightIcon />
        {!isCollapsed && "Sign in"}
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "justify-start px-0 text-xs outline-none ring-0 hover:bg-transparent focus-visible:ring-0",
            isCollapsed && "ml-auto justify-center",
          )}
        >
          <span className="flex size-8 select-none items-center justify-center rounded-md border bg-secondary text-xs outline-double outline-1 outline-border outline-offset-2">
            {(user.firstName || user.username || "U")[0].toUpperCase()}
          </span>
          {!isCollapsed && "Account"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" className="mt-1 w-48 p-1">
        <DashedContainer className="p-1">
          <div className="p-1.5 font-mono text-muted-foreground text-xs">
            {user?.primaryEmailAddress?.emailAddress}
          </div>
          <DropdownMenuSeparator />
          <SignOutButton>
            <DropdownMenuItem className="text-destructive text-xs">
              <ArrowDownRightIcon />
              Logout
            </DropdownMenuItem>
          </SignOutButton>
        </DashedContainer>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
