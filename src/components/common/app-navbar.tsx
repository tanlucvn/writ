"use client";
import {
  ChartPieIcon,
  FileTextIcon,
  FlowerIcon,
  HelpCircleIcon,
  LibraryBigIcon,
  MusicIcon,
  PenIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  XIcon,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "../logo";

import { useAppSettingsStore } from "@/store/app-settings-store";
import { useAppStore } from "@/store/app-store";
import { useDialogStore } from "@/store/dialog-store";
import { useWritesStore } from "@/store/writes-store";
import { useWritingSessionsStore } from "@/store/writing-sessions-store";
import DashedContainer from "../ui/dashed-container";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import WritingSessionControls from "../writing-sessions/writing-session-controls";
import Tips from "./tips";

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
  onZenMode,
  onSettings,
  onMusic,
  onStats,
  onHelp,
}: {
  onOpenWrites: () => void;
  onSearch: () => void;
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
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start text-xs"
            >
              <PlusIcon />
              New Write
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start text-xs"
              onClick={() => setWritesHistoryOpen(true)}
            >
              <LibraryBigIcon />
              History
            </Button>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <p className="select-none font-medium font-mono text-muted-foreground text-xs">
            Writing sessions
          </p>
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start text-xs"
              onClick={() => setIsNewWritingSessionDialogOpen(true)}
            >
              <PlusIcon />
              New Session
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start text-xs"
              onClick={() => setWritingSessionHistoryOpen(true)}
            >
              <LibraryBigIcon />
              History
            </Button>
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
      <span className="font-medium font-mono text-xs">Search</span>
      <div
        className="flex cursor-pointer items-center gap-2 rounded-md hover:bg-accent"
        onClick={onCreate}
      >
        <Button size="icon" variant="outline" className="size-8 text-xs">
          <PlusIcon />
        </Button>
        <p className="text-foreground text-sm">Create new write</p>
      </div>
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

export default AppNavBar;
