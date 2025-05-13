"use client";

import { AnimatedNumberBadge } from "@/components/animated-number-badge";
import { Button } from "@/components/ui/button";
import DashedContainer from "@/components/ui/dashed-container";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useAppStore } from "@/store/app-store";
import { useDialogStore } from "@/store/dialog-store";
import { useWritingSessionsStore } from "@/store/writing-sessions-store";
import { XIcon } from "lucide-react";
import { useState } from "react";
import { Drawer } from "vaul";
import WritingSessionItem from "./components/writing-session-item";

const WritingSessionsHistory = () => {
  const { sessions } = useWritingSessionsStore();
  const { isWritingSessionHistoryOpen, setWritingSessionHistoryOpen } =
    useDialogStore();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sessionFilter, setSessionFilter] = useState<"all" | "short" | "long">(
    "all",
  );

  const { writes } = useAppStore();

  const filteredSessions = sessions.filter((session) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearchQuery =
      session.writeId?.toLowerCase().includes(searchLower) ||
      session.duration.toString().includes(searchLower) ||
      session.startingWordCount.toString().includes(searchLower) ||
      session.endingWordCount.toString().includes(searchLower);

    if (sessionFilter === "short") {
      return session.duration <= 30 && matchesSearchQuery;
    }

    if (sessionFilter === "long") {
      return session.duration > 30 && matchesSearchQuery;
    }

    return matchesSearchQuery;
  });

  const getSessionTitle = (contentId: string | null) => {
    const write = writes.find((write) => write.id === contentId);
    return write ? write.title : "Untitled";
  };

  return (
    <Drawer.Root
      direction="right"
      open={isWritingSessionHistoryOpen}
      onOpenChange={setWritingSessionHistoryOpen}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-20 bg-black/40" />
        <Drawer.Content className="fixed right-0 bottom-0 z-40 h-full w-full overflow-hidden rounded-none border bg-background p-1 shadow-xl outline-none sm:w-[450px] sm:max-w-md sm:rounded-tl-xl sm:rounded-bl-xl md:max-w-lg">
          <DashedContainer className="flex flex-col gap-2 rounded-tl-xl rounded-bl-xl">
            {/* Header */}
            <div className="relative flex flex-col gap-2 px-4 pt-4">
              <div className="flex flex-col gap-1">
                <p className="font-mono text-muted-foreground text-xs">
                  View all previous writing sessions.
                </p>
                <Drawer.Title className="font-medium text-base text-foreground">
                  Writing Session History
                </Drawer.Title>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-4 size-8"
                  onClick={() => setWritingSessionHistoryOpen(false)}
                >
                  <XIcon />
                </Button>
              </div>

              {/* Search Input */}
              <Input
                placeholder="Search sessions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-sm"
              />

              {/* Filter Dropdown */}
              <div className="mt-2">
                <Select
                  value={sessionFilter}
                  onValueChange={(value) =>
                    setSessionFilter(value as "all" | "short" | "long")
                  }
                >
                  <SelectTrigger className="w-full text-sm">
                    <SelectValue placeholder="Filter sessions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sessions</SelectItem>
                    <SelectItem value="short">
                      Short Sessions (below 30 mins)
                    </SelectItem>
                    <SelectItem value="long">
                      Long Sessions (above 30 mins)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />
            </div>

            {/* Scrollable Content */}
            <ScrollArea id="block-scrollarea" className="flex-1">
              <div className="px-4 py-2">
                <div className="space-y-3">
                  {filteredSessions.length === 0 ? (
                    <p>No sessions found.</p>
                  ) : (
                    filteredSessions.map((session) => (
                      <WritingSessionItem
                        key={session.id}
                        session={session}
                        title={getSessionTitle(session.writeId)}
                      />
                    ))
                  )}
                </div>
              </div>
            </ScrollArea>

            {/* Footer */}
            <div className="border-t px-4 py-1.5 text-xs" data-vaul-no-drag>
              <div className="flex items-center justify-between text-foreground">
                <div className="flex select-none items-center gap-2">
                  <p className="text-xs">Sessions</p>
                  <AnimatedNumberBadge value={filteredSessions.length} />
                </div>
              </div>
            </div>
          </DashedContainer>
        </Drawer.Content>
        <Drawer.Overlay />
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default WritingSessionsHistory;
