import { useDialogStore } from "@/store/dialog-store";
import { useWritingSessionsStore } from "@/store/writing-sessions-store";
import { PauseIcon, PlayIcon, TimerOffIcon } from "lucide-react";
import { useEffect } from "react";
import { Button } from "../ui/button";
import WritingSessionProgressBar from "./writing-session-progress-bar";
import WritingSessionTimer from "./writing-session-timer";

const WritingSessionControls = () => {
  const {
    currentSession,
    isRunning,
    remainingTime,
    pauseSession,
    stopSession,
    resumeSession,
    tick,
  } = useWritingSessionsStore();
  const { setIsWritingSessionSummaryOpen } = useDialogStore();

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, tick]);

  const handleStop = () => {
    stopSession();
    setIsWritingSessionSummaryOpen(true);
  };

  if (!remainingTime) return null;

  console.log("currentSession", currentSession);
  console.log("remainingTime", remainingTime);

  return (
    <div className="mx-auto w-full">
      <div className="flex w-full items-center justify-between gap-1">
        {currentSession && <WritingSessionTimer timer={remainingTime} />}

        {currentSession && currentSession?.duration && (
          <WritingSessionProgressBar remainingTime={remainingTime} />
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {isRunning ? (
            <Button
              onClick={pauseSession}
              variant="ghost"
              className="size-6 hover:bg-transparent"
            >
              <PauseIcon />
            </Button>
          ) : (
            <Button
              variant="ghost"
              onClick={resumeSession}
              className="size-6 text-foreground hover:bg-transparent"
            >
              <PlayIcon />
            </Button>
          )}
          <Button
            onClick={handleStop}
            variant="ghost"
            className="size-6 text-destructive hover:bg-transparent hover:text-destructive"
          >
            <TimerOffIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WritingSessionControls;
