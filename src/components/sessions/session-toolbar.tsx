"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { countWords } from "@/lib/utils";
import { useActiveSessionStore } from "@/store/use-active-session-store";
import { useNoteStore } from "@/store/use-note-store";
import { useSessionStore } from "@/store/use-session-store";
import { StickyNote, Target } from "lucide-react";
import { useEffect, useState } from "react";
import { IconRenderer } from "../icon-renderer";

export function SessionToolbar() {
  const {
    sessionId,
    status,
    pause,
    resume,
    end: endSession,
  } = useActiveSessionStore();

  const { sessions, updateSession } = useSessionStore();
  const { notes } = useNoteStore();

  const session = sessions.find((s) => s.id === sessionId);
  const note = notes.find((n) => n.id === session?.noteId);

  const [elapsed, setElapsed] = useState(0);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!session || status !== "running") return;

    const startTime = Date.now() - elapsed * 1000;

    const interval = setInterval(() => {
      const secondsPassed = Math.floor((Date.now() - startTime) / 1000);
      setElapsed(secondsPassed);

      if (secondsPassed >= session.duration) {
        handleEnd();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [session, status, elapsed]);

  if (!session || !note) return null;

  const remaining = Math.max(session.duration - elapsed, 0);

  const currentWordCount = countWords(note.content);
  const wordsWritten = Math.max(
    currentWordCount - session.startingWordCount,
    0,
  );

  const wordProgress =
    session.goalType === "wordCount" && session.goalValue
      ? Math.min(Math.round((wordsWritten / session.goalValue) * 100), 100)
      : null;

  const handleEnd = async () => {
    await updateSession({ ...session, endingWordCount: currentWordCount });
    endSession();
  };

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <div className="-translate-x-1/2 absolute bottom-6 left-1/2 z-50 w-full max-w-xs rounded-xl border bg-background shadow-xs">
      {/* Expanded info */}
      {expanded && (
        <div className="space-y-3 border-b px-4 pt-4 pb-3 text-muted-foreground text-sm">
          {session.goalType && (
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              {session.goalType === "wordCount"
                ? `${session.goalValue} words`
                : "Free Write"}
            </div>
          )}
          {session.label && (
            <div className="flex items-center gap-2 italic">
              <StickyNote className="h-4 w-4" />
              {session.label}
            </div>
          )}
          {wordProgress !== null && (
            <div className="space-y-1">
              <Progress value={wordProgress} className="h-2 rounded-full" />
              <div className="text-xs">
                {wordsWritten} / {session.goalValue} words ({wordProgress}%)
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between gap-2 p-1">
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            className="h-8 rounded-lg text-xs"
            onClick={status === "running" ? pause : resume}
          >
            {status === "running" ? (
              <IconRenderer name="Pause" />
            ) : (
              <IconRenderer name="Play" />
            )}
            {formatTime(remaining)}
            <Separator orientation="vertical" />
            <span className="flex items-center gap-1">
              <IconRenderer name="Target" /> {wordProgress ?? 0}%
            </span>
          </Button>

          <Button variant="outline" size="icon" onClick={handleEnd}>
            <IconRenderer name="StopCircle" />
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setExpanded(!expanded)}
        >
          <IconRenderer name={expanded ? "ArrowDown" : "ArrowUp"} />
        </Button>
      </div>
    </div>
  );
}
