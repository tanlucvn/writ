"use client";
import {
  AppWindowMacIcon,
  ArrowUpRightIcon,
  ChartPieIcon,
  CornerDownLeftIcon,
  FileTextIcon,
  FlowerIcon,
  GithubIcon,
  HelpCircleIcon,
  InfoIcon,
  LibraryBigIcon,
  LockIcon,
  MusicIcon,
  PenIcon,
  PlusIcon,
  ScrollTextIcon,
  SearchIcon,
  SettingsIcon,
  XIcon,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "../../logo";

import { useAppSettingsStore } from "@/store/app-settings-store";
import { useAppStore } from "@/store/app-store";
import { useDialogStore } from "@/store/dialog-store";
import { useWritesStore } from "@/store/writes-store";
import { useWritingSessionsStore } from "@/store/writing-sessions-store";
import Link from "next/link";
import DashedContainer from "../../ui/dashed-container";
import { ScrollArea, ScrollBar } from "../../ui/scroll-area";
import { Separator } from "../../ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import WritingSessionControls from "../../writing-sessions/writing-session-controls";
import Tips from "../tips";

const AppNavBar = () => {
  const { writes, setCurrentWrite, createNewWrite } = useWritesStore();
  const { remainingTime } = useWritingSessionsStore();
  const { currentMenu, setCurrentMenu } = useAppStore();
  const { toggleZenMode } = useAppSettingsStore();
  const {
    setSettingsOpen,
    setMusicPlayerOpen,
    setIsHelpDialogOpen,
    setStatisticsOpen,
  } = useDialogStore();

  const [searchQuery, setSearchQuery] = useState("");

  const toggleMenu = () =>
    setCurrentMenu(currentMenu === "menu" ? "none" : "menu");

  const filteredWrites = writes.filter((write) =>
    (write.title || "Untitled")
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      {currentMenu === "search" && !!searchQuery && (
        <SearchResults
          items={filteredWrites}
          onSelect={(item) => {
            setCurrentWrite(item);
            setSearchQuery("");
            setCurrentMenu("menu");
          }}
          onCreate={() => {
            createNewWrite();
            setSearchQuery("");
            setCurrentMenu("menu");
          }}
        />
      )}

      {currentMenu === "writes" && <WritesMenu />}
      {currentMenu === "pages" && <PagesMenu />}

      <div className="flex h-fit w-full items-center gap-2 border-t bg-background py-1">
        <LogoToggleButton toggleMenu={toggleMenu} />

        <Separator orientation="vertical" className="h-4 w-[1px]" />

        <ScrollArea className="w-full">
          <div className="flex items-center p-[3px]">
            {currentMenu === "none" &&
              (remainingTime ? <WritingSessionControls /> : <Tips />)}

            {currentMenu === "menu" && (
              <MainMenu
                onOpenWrites={() => setCurrentMenu("writes")}
                onSearch={() => setCurrentMenu("search")}
                onOpenPages={() => setCurrentMenu("pages")}
                onZenMode={toggleZenMode}
                onSettings={() => setSettingsOpen(true)}
                onMusic={() => setMusicPlayerOpen(true)}
                onStats={() => setStatisticsOpen(true)}
                onHelp={() => setIsHelpDialogOpen(true)}
              />
            )}

            {currentMenu === "writes" && (
              <span className="text-muted-foreground text-xs">
                What’s on your mind today?
              </span>
            )}

            {currentMenu === "search" && (
              <div className="w-full">
                <Input
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What are you searching for...?"
                  className="h-8 text-xs placeholder:text-xs"
                />
              </div>
            )}
          </div>

          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </div>
    </>
  );
};

// Subcomponents

const LogoToggleButton = ({
  toggleMenu,
}: {
  toggleMenu: () => void;
}) => (
  <div className="flex shrink-0 items-center gap-2 p-[3px]">
    <div
      className="group relative flex cursor-pointer items-center"
      onClick={toggleMenu}
    >
      <Button
        className="size-8 outline-1 outline-border outline-offset-2"
        size="icon"
        variant="secondary"
      >
        <Logo />
      </Button>
    </div>
  </div>
);

const MainMenu = ({
  onOpenWrites,
  onSearch,
  onOpenPages,
  onZenMode,
  onSettings,
  onMusic,
  onStats,
  onHelp,
}: {
  onOpenWrites: () => void;
  onSearch: () => void;
  onOpenPages: () => void;
  onZenMode: () => void;
  onSettings: () => void;
  onMusic: () => void;
  onStats: () => void;
  onHelp: () => void;
}) => (
  <div className="flex h-full w-full items-center gap-[10px]">
    <IconButton
      icon={<PenIcon />}
      onClick={onOpenWrites}
      label="Writes | Writing Sessions"
    />
    <IconButton icon={<SearchIcon />} onClick={onSearch} label="Search" />
    <IconButton
      icon={<AppWindowMacIcon />}
      onClick={onOpenPages}
      label="Pages"
    />
    <IconButton icon={<FlowerIcon />} onClick={onZenMode} label="Zen Mode" />
    <IconButton icon={<SettingsIcon />} onClick={onSettings} label="Settings" />
    <IconButton icon={<MusicIcon />} onClick={onMusic} label="Music" />
    <IconButton icon={<ChartPieIcon />} onClick={onStats} label="Statistics" />
    <IconButton icon={<HelpCircleIcon />} onClick={onHelp} label="Help" />
  </div>
);

const WritesMenu = () => {
  const {
    setWritesHistoryOpen,
    setWritingSessionHistoryOpen,
    setIsNewWritingSessionDialogOpen,
    setIsWriteSummaryOpen,
  } = useDialogStore();
  const { setCurrentMenu } = useAppStore();

  return (
    <div className="mb-2 rounded-2xl border bg-background p-1">
      <DashedContainer className="relative flex flex-col gap-2 rounded-xl p-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentMenu("menu")}
          className="absolute top-2 right-2 size-fit text-muted-foreground hover:bg-transparent hover:text-foreground"
        >
          <XIcon />
        </Button>
        <div className="space-y-2">
          <p className="select-none font-medium font-mono text-muted-foreground text-xs">
            Writes
          </p>
          <div className="flex flex-col items-center justify-center gap-2">
            <MenuItemButton icon={<PlusIcon />} label="New Write" />
            <MenuItemButton
              icon={<LibraryBigIcon />}
              label="View History"
              onClick={() => setWritesHistoryOpen(true)}
            />
            <MenuItemButton
              icon={<ScrollTextIcon />}
              label="View Summary"
              onClick={() => setIsWriteSummaryOpen(true)}
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <p className="select-none font-medium font-mono text-muted-foreground text-xs">
            Writing sessions
          </p>
          <div className="flex flex-col items-center justify-center gap-2">
            <MenuItemButton
              icon={<PlusIcon />}
              label="New Session"
              onClick={() => setIsNewWritingSessionDialogOpen(true)}
            />
            <MenuItemButton
              icon={<LibraryBigIcon />}
              label="View History"
              onClick={() => setWritingSessionHistoryOpen(true)}
            />
          </div>
        </div>
      </DashedContainer>
    </div>
  );
};

const PagesMenu = () => {
  const { setCurrentMenu, setAppTab } = useAppStore();

  return (
    <div className="mb-2 rounded-2xl border bg-background p-1">
      <DashedContainer className="relative flex flex-col gap-2 rounded-xl p-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentMenu("menu")}
          className="absolute top-2 right-2 size-fit text-muted-foreground hover:bg-transparent hover:text-foreground"
        >
          <XIcon />
        </Button>
        <div className="space-y-2">
          <p className="select-none font-medium font-mono text-muted-foreground text-xs">
            Pages
          </p>
          <div className="flex flex-col items-center justify-center gap-2">
            <MenuItemButton
              icon={<ArrowUpRightIcon />}
              label="Sign In"
              onClick={() => setAppTab("signin")}
            />
            <MenuItemButton
              icon={<InfoIcon />}
              label="About"
              onClick={() => setAppTab("about")}
            />
            <MenuItemButton
              icon={<LockIcon />}
              label="Privacy"
              onClick={() => setAppTab("privacy")}
            />
            <Separator />
            <MenuItemLinkButton
              icon={<GithubIcon />}
              label="Github"
              href="https://github.com/tanlucvn/miniwrit"
            />
          </div>
        </div>
      </DashedContainer>
    </div>
  );
};

const SearchResults = ({
  items,
  onSelect,
  onCreate,
}: {
  items: { id: string; title?: string }[];
  onSelect: (item: any) => void;
  onCreate: () => void;
}) => (
  <div className="mb-2 rounded-2xl border bg-background p-1">
    <DashedContainer className="flex flex-col gap-2 rounded-xl p-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-accent"
          onClick={() => onSelect(item)}
        >
          <FileTextIcon className="h-4 w-4" />
          <p className="text-foreground text-sm">{item.title}</p>
        </div>
      ))}
      <p className="select-none font-medium font-mono text-muted-foreground text-xs">
        Search
      </p>
      <MenuItemButton
        icon={<PlusIcon />}
        label="Create new write"
        onClick={onCreate}
      />
    </DashedContainer>
  </div>
);

const IconButton = ({
  icon,
  onClick,
  label,
}: {
  icon: React.ReactNode;
  onClick: () => void;
  label: string;
}) => (
  <Tooltip delayDuration={150}>
    <TooltipTrigger asChild>
      <Button
        variant="secondary"
        size="icon"
        onClick={onClick}
        className="size-8 outline-double outline-1 outline-border outline-offset-2"
      >
        {icon}
      </Button>
    </TooltipTrigger>
    <TooltipContent side="top">
      <p>{label}</p>
    </TooltipContent>
  </Tooltip>
);

const MenuItemButton = ({
  icon,
  onClick,
  label,
}: {
  icon: React.ReactNode;
  onClick?: () => void;
  label: string;
}) => (
  <Button
    variant="ghost"
    size="sm"
    className="group relative w-full justify-start px-2 text-muted-foreground text-xs hover:bg-transparent hover:text-foreground"
    onClick={onClick}
  >
    <div className="rounded-md border p-1 outline-double outline-1 outline-border outline-offset-2 group-hover:bg-secondary">
      {icon}
    </div>
    <div className="absolute right-2 hidden group-hover:block">
      <CornerDownLeftIcon />
    </div>
    {label}
  </Button>
);

interface MenuItemLinkButtonProps {
  icon: React.ReactNode;
  href: string;
  label: string;
}

export const MenuItemLinkButton = ({
  icon,
  href,
  label,
}: MenuItemLinkButtonProps) => (
  <Button
    asChild
    variant="ghost"
    size="sm"
    className="group relative w-full justify-start px-2 text-muted-foreground text-xs hover:bg-transparent hover:text-foreground"
  >
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <div className="rounded-md border p-1 outline-double outline-1 outline-border outline-offset-2 group-hover:bg-secondary">
        {icon}
      </div>
      <div className="absolute right-2 hidden group-hover:block">
        <CornerDownLeftIcon />
      </div>
      {label}
    </Link>
  </Button>
);

export default AppNavBar;
