"use client";

import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/app-store";
import { HistoryIcon } from "lucide-react";
import { useEffect } from "react";
import { Drawer } from "vaul";

export default function WriteHistory() {
  const { writes, refreshWrites, setCurrentWrite } = useAppStore();

  useEffect(() => {
    refreshWrites();
  }, [refreshWrites]);

  return (
    <Drawer.Root direction="right">
      <Drawer.Trigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative size-8 rounded-full text-foreground transition-colors hover:bg-foreground/5"
        >
          <HistoryIcon className="size-4" />
          {writes && writes.length > 1 && (
            <span className="-top-1 -right-1 absolute flex h-4 w-4 items-center justify-center rounded-full bg-primary/10 font-medium text-[10px] text-foreground">
              {writes.length > 9 ? "9+" : writes.length}
            </span>
          )}
        </Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed right-0 bottom-0 z-40 flex h-full w-[450px] max-w-xs flex-col overflow-hidden rounded-xl border bg-background shadow-none outline-none sm:max-w-md md:max-w-lg">
          <div className="p-4">
            <Drawer.Title className="font-medium">Write History</Drawer.Title>
            <div className="mb-3 text-muted-foreground text-xs md:text-sm">
              View all the previous writes and drafts.
            </div>

            <div className="space-y-3 overflow-y-auto py-4">
              {writes.length === 0 ? (
                <div className="py-8 text-center text-muted-foreground text-sm">
                  <p>No writes yet. Start writing your first write!</p>
                </div>
              ) : (
                writes.map((write) => (
                  <div
                    key={write.id}
                    className="cursor-pointer rounded-lg border p-3 transition hover:bg-muted/50"
                    onClick={() => setCurrentWrite(write)}
                  >
                    <h3 className="font-medium text-base">
                      {write.title || "Untitled"}
                    </h3>
                    <p className="text-muted-foreground text-xs">
                      Last updated: {new Date(write.updatedAt).toLocaleString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </Drawer.Content>
        <Drawer.Overlay />
      </Drawer.Portal>
    </Drawer.Root>
  );
}
