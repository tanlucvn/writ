"use client";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import WritingSessionControls from "@/components/writing-sessions/writing-session-controls";
import { useAppStore } from "@/store/app-store";
import { useWritesStore } from "@/store/writes-store";
import { useWritingSessionsStore } from "@/store/writing-sessions-store";
import { useState } from "react";
import Tips from "../tips";
import LogoButton from "./components/logo-button";
import MainMenu from "./menus/main-menu";
import PagesMenu from "./menus/pages-menu";
import SearchResultsMenu from "./menus/search-results-menu";
import ToolsMenu from "./menus/tools-menu";
import WritesMenu from "./menus/writes";

const Navbar = () => {
  const { writes, setCurrentWrite, createNewWrite } = useWritesStore();
  const { remainingTime } = useWritingSessionsStore();
  const { currentMenu, setCurrentMenu } = useAppStore();

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
        <SearchResultsMenu
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
      {currentMenu === "tools" && <ToolsMenu />}

      <div className="flex h-fit w-full items-center gap-2 border-t bg-background py-1">
        <LogoButton toggleMenu={toggleMenu} />
        <Separator orientation="vertical" className="h-4 w-[1px]" />

        <ScrollArea className="w-full">
          <div className="flex items-center p-[3px]">
            {currentMenu === "none" &&
              (remainingTime ? <WritingSessionControls /> : <Tips />)}

            {currentMenu === "menu" && (
              <MainMenu
                onOpenWrites={() => setCurrentMenu("writes")}
                onOpenSearch={() => setCurrentMenu("search")}
                onOpenPages={() => setCurrentMenu("pages")}
                onOpenTools={() => setCurrentMenu("tools")}
              />
            )}

            {currentMenu === "writes" && (
              <span className="text-muted-foreground text-xs">
                What’s on your mind today?
              </span>
            )}

            {currentMenu === "pages" && (
              <span className="text-muted-foreground text-xs">
                Explore more pages
              </span>
            )}

            {currentMenu === "tools" && (
              <span className="text-muted-foreground text-xs">
                Customize your writing experience
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

export default Navbar;
