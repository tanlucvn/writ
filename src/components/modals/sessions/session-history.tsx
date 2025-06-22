"use client";

import { IconRenderer } from "@/components/icon-renderer";
import { Button } from "@/components/ui/button";
import { Input, InputPrefix, InputWrapper } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDialogStore } from "@/store/use-dialog-store";
import { useSessionStore } from "@/store/use-session-store";
import { useMemo, useState } from "react";
import { Drawer } from "vaul";
import { SessionHistoryItem } from "./_components/session-history-item";

export default function SessionHistoryModal() {
  const { isSessionHistoryOpen, setIsSessionHistoryOpen } = useDialogStore();
  const { sessions } = useSessionStore();

  const [query, setQuery] = useState("");

  const filteredSessions = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sessions.filter((s) => {
      const label = s.label?.toLowerCase() || "";
      return label.includes(q);
    });
  }, [query, sessions]);

  return (
    <Drawer.Root
      open={isSessionHistoryOpen}
      onOpenChange={setIsSessionHistoryOpen}
      direction="right"
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-40 bg-black/40" />
        <Drawer.Content className="fixed top-2 right-2 bottom-2 left-2 z-50 flex h-[98%] flex-col overflow-hidden rounded-xl border bg-background shadow-xl sm:left-auto sm:w-full sm:max-w-md">
          {/* Header */}
          <div className="shrink-0 border-b p-4 pb-2">
            <Drawer.Title className="font-medium text-base text-foreground">
              Session History
            </Drawer.Title>
            <Drawer.Description className="text-muted-foreground text-xs">
              A list of all your writing sessions.
            </Drawer.Description>

            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4"
              onClick={() => setIsSessionHistoryOpen(false)}
            >
              <IconRenderer name="X" />
            </Button>

            <div className="mt-3 space-y-2">
              <InputWrapper>
                <InputPrefix>
                  <IconRenderer
                    name="Search"
                    className="text-muted-foreground"
                  />
                </InputPrefix>
                <Input
                  placeholder="Search by label..."
                  className="pl-8"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </InputWrapper>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-hidden">
            <ScrollArea id="block-scrollarea" className="h-full px-4">
              {filteredSessions.length === 0 ? (
                <div className="flex h-full flex-col justify-center text-center text-sm">
                  <p>No sessions found.</p>
                  <p className="mt-1 text-muted-foreground text-xs">
                    Try writing something first!
                  </p>
                </div>
              ) : (
                <div className="space-y-2 py-3">
                  {filteredSessions.map((session) => (
                    <SessionHistoryItem key={session.id} session={session} />
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>

          {/* Footer */}
          <div className="flex shrink-0 items-center justify-between border-t px-4 py-2 text-muted-foreground text-xs">
            <p>
              {filteredSessions.length}{" "}
              {filteredSessions.length === 1 ? "Session" : "Sessions"}
            </p>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
