"use client";

import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/app-store";
import { HistoryIcon } from "lucide-react";
import { useEffect } from "react";
import { Drawer } from "vaul";
import { AnimatedNumberBadge } from "../animated-number-badge";
import { Separator } from "../ui/separator";
import { HistoryItem } from "./history/item";
import SortDropdown from "./history/sort";

export default function WritesHistoryDrawer() {
  const { writes, refreshWrites } = useAppStore();

  useEffect(() => {
    refreshWrites();
  }, [refreshWrites]);

  return (
    <Drawer.Root direction="right">
      <Drawer.Trigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative size-8 text-foreground outline-2 outline-border outline-offset-2 transition-colors hover:bg-foreground/5 hover:outline-dashed"
        >
          <HistoryIcon className="size-4" />
          {writes && writes.length > 1 && (
            <span className="-top-2 -right-1 absolute flex h-4 w-4 select-none items-center justify-center rounded-full bg-primary font-medium text-[10px] text-primary-foreground">
              {writes.length > 9 ? "9+" : writes.length}
            </span>
          )}
        </Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed right-0 bottom-0 z-40 flex h-full w-[450px] max-w-xs flex-col overflow-hidden rounded-xl border bg-background shadow-none outline-none sm:max-w-md md:max-w-lg">
          <div className="flex flex-1 flex-col p-4">
            <Drawer.Title className="font-medium">Write History</Drawer.Title>
            <div className="mb-3 text-muted-foreground text-xs md:text-sm">
              View all the previous writes and drafts.
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto py-4">
              {writes.length === 0 ? (
                <div className="py-8 text-center text-muted-foreground text-sm">
                  <p>No writes yet. Start writing your first write!</p>
                </div>
              ) : (
                writes.map((write) => (
                  <HistoryItem key={write.id} write={write} />
                ))
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="opacity-70 backdrop-blur-sm transition-opacity duration-300 hover:opacity-100">
            <Separator />
            <div
              className="flex items-center justify-between px-4 py-2 text-xs"
              data-vaul-no-drag
            >
              <div className="flex select-none items-center gap-2">
                <p className="flex items-center gap-2 text-xs">Writes</p>
                <AnimatedNumberBadge value={writes.length} />
              </div>

              <SortDropdown />
            </div>
          </div>
        </Drawer.Content>

        <Drawer.Overlay />
      </Drawer.Portal>
    </Drawer.Root>
  );
}
