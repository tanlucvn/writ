import { useDialogStore } from "@/store/dialog-store";
import { useWritingSessionsStore } from "@/store/writing-sessions-store";
import { PauseIcon, PlayIcon, TimerOffIcon } from "lucide-react";
import { useEffect } from "react";
import { Button } from "../ui/button";
import DashedContainer from "../ui/dashed-container";
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
    <div className="mx-auto w-full rounded-md border p-1">
      <DashedContainer className="flex flex-col items-center gap-4 p-4">
        <div className="flex w-full flex-col items-center space-y-2">
          {/* Remaining Time */}
          {currentSession && <WritingSessionTimer timer={remainingTime} />}

          {/* Progress Bar */}
          {currentSession && currentSession?.duration && (
            <WritingSessionProgressBar remainingTime={remainingTime} />
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          {isRunning ? (
            <Button
              onClick={pauseSession}
              variant="secondary"
              className="size-8"
            >
              <PauseIcon />
            </Button>
          ) : (
            <Button onClick={resumeSession} className="size-8">
              <PlayIcon />
            </Button>
          )}
          <Button
            onClick={handleStop}
            variant="secondary"
            className="size-8 text-destructive"
          >
            <TimerOffIcon />
          </Button>
        </div>
      </DashedContainer>
    </div>
  );
};

export default WritingSessionControls;
