"use client";

import { IconRenderer } from "@/components/icon-renderer";
import { SessionControlsDropdown } from "@/components/sessions/session-controls-dropdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getRelativeTime } from "@/lib/utils";
import type { Session } from "@/types";

const SessionHistoryItem = ({ session }: { session: Session }) => {
  const words = (session.endingWordCount ?? 0) - session.startingWordCount;

  const progress =
    session.goalType === "wordCount" && session.goalValue
      ? Math.min((words / session.goalValue) * 100, 100)
      : null;

  const goalCompleted =
    session.goalType === "wordCount" &&
    session.goalValue &&
    words >= session.goalValue;

  return (
    <Card className="p-0">
      <CardContent className="space-y-2 p-4">
        <SessionHeader session={session} />
        {progress !== null && (
          <SessionProgress
            words={words}
            goal={session.goalValue!}
            progress={progress}
          />
        )}
        <SessionStats
          duration={session.duration}
          words={words}
          goalValue={session.goalValue}
          goalType={session.goalType}
          goalCompleted={goalCompleted}
          session={session}
        />
      </CardContent>
    </Card>
  );
};

const SessionHeader = ({ session }: { session: Session }) => {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <span>
              <IconRenderer
                name={session.goalType === "wordCount" ? "Target" : "Feather"}
                className="size-4 text-muted-foreground"
              />
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {session.goalType === "wordCount" ? "Word Count" : "Free Write"}
            </p>
          </TooltipContent>
        </Tooltip>
        <span className="truncate font-medium text-foreground text-sm">
          {session.label}
        </span>
      </div>
      <span className="shrink-0 text-muted-foreground text-xs">
        {getRelativeTime(session.updatedAt)}
      </span>
    </div>
  );
};

const SessionProgress = ({
  words,
  goal,
  progress,
}: {
  words: number;
  goal: number;
  progress: number;
}) => {
  return (
    <div className="space-y-1">
      <Progress value={progress} className="h-1 bg-muted" />
      <div className="flex justify-between text-[10px] text-muted-foreground">
        <span>
          {words}/{goal} words
        </span>
        <span>{Math.round(progress)}%</span>
      </div>
    </div>
  );
};

const SessionStats = ({
  duration,
  words,
  goalValue,
  goalType,
  goalCompleted,
  session,
}: {
  duration: number;
  words: number;
  goalValue?: number;
  goalType: Session["goalType"];
  goalCompleted: boolean | undefined | number;
  session: Session;
}) => {
  return (
    <div className="flex items-center justify-between text-muted-foreground text-xs">
      <div className="flex flex-wrap items-center gap-4">
        <Stat icon="Timer" value={`${duration} min`} />
        <Stat icon="PencilLine" value={`${words} words`} />
        {goalType === "wordCount" && goalValue && (
          <Stat icon="Flag" value={goalValue} />
        )}
      </div>
      <div className="flex items-center gap-2">
        {goalCompleted && (
          <Badge variant="secondary" className="rounded-full text-xs">
            <IconRenderer name="Check" />
            Completed
          </Badge>
        )}
        <SessionControlsDropdown session={session}>
          <Button variant="ghost" size="icon" className="ml-auto h-6 w-6">
            <IconRenderer name="Ellipsis" className="size-4" />
          </Button>
        </SessionControlsDropdown>
      </div>
    </div>
  );
};

const Stat = ({ icon, value }: { icon: string; value: React.ReactNode }) => {
  return (
    <div className="flex items-center gap-1">
      <IconRenderer name={icon} className="size-3" />
      <span>{value}</span>
    </div>
  );
};

export default SessionHistoryItem;
