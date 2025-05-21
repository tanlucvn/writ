"use client";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import WritingSessionControls from "@/components/writing-sessions/writing-session-controls";
import { useAppStore } from "@/store/app-store";
import { useWritesStore } from "@/store/writes-store";
import { useWritingSessionsStore } from "@/store/writing-sessions-store";
import { useEffect, useMemo, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

import Tips from "../tips";
import LogoButton from "./components/logo-button";
import MainMenu from "./menus/main-menu";
import PagesMenu from "./menus/pages-menu";
import SearchResultsMenu from "./menus/search-results-menu";
import ToolsMenu from "./menus/tools-menu";
import WritesMenu from "./menus/writes-menu";

const Navbar = () => {
  const { writes, setCurrentWrite, createNewWrite } = useWritesStore();
  const { remainingTime } = useWritingSessionsStore();
  const { currentMenu, setCurrentMenu } = useAppStore();

  const menuRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMenu = () =>
    setCurrentMenu(currentMenu === "menu" ? "none" : "menu");

  useHotkeys("Escape", () => {
    if (currentMenu !== "menu" && currentMenu !== "none")
      setCurrentMenu("menu");
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        currentMenu !== "menu" &&
        currentMenu !== "none" &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setCurrentMenu("menu");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [currentMenu, setCurrentMenu]);

  const filteredWrites = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return writes.filter((w) =>
      (w.title || "Untitled").toLowerCase().includes(q),
    );
  }, [writes, searchQuery]);

  const renderMenu = () => {
    switch (currentMenu) {
      case "search":
        return (
          !!searchQuery && (
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
          )
        );
      case "writes":
        return <WritesMenu />;
      case "pages":
        return <PagesMenu />;
      case "tools":
        return <ToolsMenu />;
      default:
        return null;
    }
  };

  const renderCaption = () => {
    const captions: Record<string, string> = {
      writes: "What’s on your mind today?",
      pages: "Explore more pages",
      tools: "Customize your writing experience",
    };
    return captions[currentMenu] ? (
      <span className="text-muted-foreground text-xs">
        {captions[currentMenu]}
      </span>
    ) : null;
  };

  return (
    <div ref={menuRef}>
      {renderMenu()}

      <div className="flex h-fit w-full items-center gap-2 border-t bg-background px-2 py-1">
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

            {renderCaption()}

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
    </div>
  );
};

export default Navbar;
