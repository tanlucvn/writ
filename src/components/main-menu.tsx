"use client";

import { createWrite, saveWrite } from "@/services/db/writes";
import { useAppStore } from "@/store/app-store";
import { useDialogStore } from "@/store/dialog-store";
import {
  BadgeInfoIcon,
  CircleHelpIcon,
  CircleIcon,
  CirclePlusIcon,
  FileTextIcon,
  FocusIcon,
  GithubIcon,
  ListIcon,
  PencilIcon,
  SettingsIcon,
  ShieldIcon,
  TimerIcon,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { ThemeSwitcher } from "./theme";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Kbd } from "./ui/kbd";

export default function MainMenu() {
  const { setSettingsOpen } = useDialogStore();
  const { refreshWrites, setCurrentWrite } = useAppStore();

  const handleCreate = async () => {
    const newWrite = createWrite();
    await saveWrite(newWrite);

    toast.success("New write created successfully!");

    setCurrentWrite(newWrite);
    refreshWrites();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="size-8 outline-2 outline-border outline-offset-2 hover:outline-dashed"
          size="icon"
          variant="secondary"
        >
          <CircleIcon className="fill-primary" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="mt-2">
        <div className="h-full w-full rounded-md border-2 border-border border-dashed p-1">
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span className="flex h-full w-full cursor-pointer items-center justify-start">
                <FileTextIcon className="mr-2 h-4 w-4" />
                <span>Writes</span>
              </span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="ml-4">
                <div className="h-full w-full rounded-md border-2 border-border border-dashed p-1">
                  <DropdownMenuItem
                    className="flex w-full items-center justify-between"
                    onClick={handleCreate}
                  >
                    <span className="flex h-full w-full cursor-pointer items-center justify-start">
                      <CirclePlusIcon className="mr-2 h-4 w-4" />
                      <span>New Write</span>
                    </span>
                    <DropdownMenuShortcut className="ml-6">
                      <Kbd keys="Ctrl+?" />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex w-full items-center justify-between">
                    <span className="flex h-full w-full cursor-pointer items-center justify-start">
                      <ListIcon className="mr-2 h-4 w-4" />
                      <span>All Writes</span>
                    </span>
                    <DropdownMenuShortcut className="ml-6">
                      <Kbd keys="Ctrl+?" />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span className="flex h-full w-full cursor-pointer items-center justify-start">
                <PencilIcon className="mr-2 h-4 w-4" />
                <span>Writing Sessions</span>
              </span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="ml-4">
                <div className="h-full w-full rounded-md border-2 border-border border-dashed p-1">
                  <DropdownMenuItem className="flex items-center justify-between">
                    <span className="flex h-full w-full cursor-pointer items-center justify-start">
                      <TimerIcon className="mr-2 h-4 w-4" />
                      <span>New Session</span>
                    </span>
                    <DropdownMenuShortcut className="ml-6">
                      <Kbd keys="Ctrl+?" />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center justify-between">
                    <span className="flex h-full w-full cursor-pointer items-center justify-start">
                      <ListIcon className="mr-2 h-4 w-4" />
                      <span>All Sessions</span>
                    </span>
                    <DropdownMenuShortcut className="ml-6">
                      <Kbd keys="Ctrl+?" />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <span className="flex h-full w-full cursor-pointer items-center justify-between">
              <span className="inline-flex items-center">
                <FocusIcon className="mr-2 h-4 w-4" />
                <span>Focus Mode</span>
              </span>
              <DropdownMenuShortcut className="ml-16">
                <Kbd keys="Ctrl+?" />
              </DropdownMenuShortcut>
            </span>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setSettingsOpen(true)}>
            <span className="flex h-full w-full cursor-pointer items-center justify-between">
              <span className="inline-flex items-center">
                <SettingsIcon className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </span>
              <DropdownMenuShortcut className="ml-16">
                <Kbd keys="Ctrl+?" />
              </DropdownMenuShortcut>
            </span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <Link
              className="flex h-full w-full cursor-pointer items-center justify-start"
              href="https://github.com/tanlucvn/miniwrit"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon className="mr-2 h-4 w-4" />
              <span>Github</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <span className="flex h-full w-full cursor-pointer items-center justify-between">
              <span className="inline-flex items-center">
                <CircleHelpIcon className="mr-2 h-4 w-4" />
                <span>Help</span>
              </span>
              <DropdownMenuShortcut className="ml-16">
                <Kbd keys="Ctrl+?" />
              </DropdownMenuShortcut>
            </span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <Link
              className="flex h-full w-full cursor-pointer items-center justify-start"
              href="/"
            >
              <BadgeInfoIcon className="mr-2 h-4 w-4" />
              <span>About</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Link
              className="flex h-full w-full cursor-pointer items-center justify-start"
              href="/"
            >
              <ShieldIcon className="mr-2 h-4 w-4" />
              <span>Privacy</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <div className="flex items-center justify-between p-1">
            <p className="text-muted-foreground text-sm">Version: 1.0</p>
            <ThemeSwitcher />
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
