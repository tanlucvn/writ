"use client";

import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/app-store";
import { HistoryIcon, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Drawer } from "vaul";
import { AnimatedNumberBadge } from "../animated-number-badge";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { HistoryItem } from "./history/item";
import SortDropdown from "./history/sort";

export default function WritesHistoryDrawer() {
  const { writes, refreshWrites } = useAppStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(true);

  const filteredWrites = writes.filter((write) =>
    (write.title || "Untitled")
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  useEffect(() => {
    setIsRefreshing(true);
    refreshWrites().finally(() => setIsRefreshing(false));
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
          {writes.length > 1 && (
            <span className="-top-2 -right-1 absolute flex h-4 w-4 select-none items-center justify-center rounded-full bg-primary font-medium text-[10px] text-primary-foreground">
              {writes.length > 9 ? "9+" : writes.length}
            </span>
          )}
        </Button>
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed right-0 bottom-0 z-40 h-full w-[450px] max-w-xs overflow-hidden rounded-tl-xl rounded-bl-xl border bg-background p-1 shadow-xl outline-none sm:max-w-md md:max-w-lg">
          <div className="flex h-full w-full flex-col rounded-tl-xl rounded-bl-xl border-2 border-border border-dashed">
            <div className="flex h-full w-full flex-1 flex-col overflow-hidden">
              <div className="flex flex-col gap-4 px-4 pt-4">
                <div className="flex flex-col gap-1">
                  <Drawer.Title className="font-medium text-base text-foreground">
                    Write History
                  </Drawer.Title>
                  <p className="text-muted-foreground text-sm">
                    View all the previous writes and drafts.
                  </p>
                </div>

                <Input
                  placeholder="Search writes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="text-sm"
                />
              </div>

              <div className="h-full flex-1 overflow-hidden">
                <ScrollArea className="h-full p-4">
                  {isRefreshing ? (
                    <div className="flex h-48 items-center justify-center text-muted-foreground">
                      <Loader2 className="size-5 animate-spin" />
                    </div>
                  ) : filteredWrites.length === 0 ? (
                    <div className="py-12 text-center text-sm">
                      <p>No writes found.</p>
                      <p className="mt-1 text-muted-foreground text-xs">
                        Start writing something awesome!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredWrites.map((write) => (
                        <HistoryItem key={write.id} write={write} />
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </div>
            </div>

            <div className="border-t-2 border-dashed bg-background/80 backdrop-blur-md transition-opacity duration-300 hover:bg-background/90">
              <div
                className="flex items-center justify-between px-4 py-2 text-xs"
                data-vaul-no-drag
              >
                <div className="flex select-none items-center gap-2 text-foreground">
                  <p className="text-xs">Writes</p>
                  <AnimatedNumberBadge value={filteredWrites.length} />
                </div>
                <SortDropdown />
              </div>
            </div>
          </div>
        </Drawer.Content>

        <Drawer.Overlay />
      </Drawer.Portal>
    </Drawer.Root>
  );
}
