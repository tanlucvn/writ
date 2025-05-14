import { useDialogStore } from "@/store/dialog-store";
import { useWritingSessionsStore } from "@/store/writing-sessions-store";
import { PauseIcon, PlayIcon, TimerOffIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import WritingSessionProgressBar from "./writing-session-progress-bar";
import WritingSessionTimer from "./writing-session-timer";

const WritingSessionControls = () => {
  const { isRunning, remainingTime, pauseSession, stopSession, resumeSession } =
    useWritingSessionsStore();
  const { setIsWritingSessionSummaryOpen } = useDialogStore();

  const handleStop = () => {
    stopSession();
    setIsWritingSessionSummaryOpen(true);
  };

  if (!remainingTime) return null;

  console.log(remainingTime);

  return (
    <div className="flex w-full items-center justify-between gap-4">
      <div className="flex w-full items-center justify-start gap-2">
        <WritingSessionTimer timer={remainingTime} />
        <WritingSessionProgressBar remainingTime={remainingTime} />
      </div>

      <div className="flex items-center gap-2">
        <Separator orientation="vertical" className="h-4 w-[1px]" />
        {isRunning ? (
          <Button
            onClick={pauseSession}
            variant="secondary"
            size="sm"
            className="size-8 text-xs outline-double outline-1 outline-border outline-offset-2"
          >
            <PauseIcon />
          </Button>
        ) : (
          <Button
            onClick={resumeSession}
            variant="secondary"
            size="sm"
            className="size-8 text-xs outline-double outline-1 outline-border outline-offset-2"
          >
            <PlayIcon />
          </Button>
        )}
        <Button
          onClick={handleStop}
          variant="secondary"
          size="sm"
          className="size-8 text-destructive text-xs outline-double outline-1 outline-border outline-offset-2"
        >
          <TimerOffIcon />
        </Button>
      </div>
    </div>
  );
};

export default WritingSessionControls;
