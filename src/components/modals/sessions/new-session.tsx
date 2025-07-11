"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCurrentNote } from "@/hooks/use-current-note";
import { useSessionActions } from "@/hooks/use-session-actions";
import { countWords } from "@/lib/utils";
import { dexie } from "@/services";
import { useActiveSessionStore } from "@/store/use-active-session-store";
import { useDialogStore } from "@/store/use-dialog-store";
import type { GoalType } from "@/types";
import { useState } from "react";

const durations = [5, 10, 15, 25, 45];

const NewSessionModal = () => {
  const { isNewSessionOpen, setIsNewSessionOpen } = useDialogStore();
  const { start } = useActiveSessionStore();
  const { onCreateSession } = useSessionActions();
  const currentNote = useCurrentNote();
  const currentWordCount = countWords(currentNote?.content ?? "");

  const [duration, setDuration] = useState<number | null>(null);
  const [goalType, setGoalType] = useState<GoalType | undefined>();
  const [goalValue, setGoalValue] = useState<number>(0);
  const [label, setLabel] = useState("");

  const isStartDisabled = !duration || (goalType === "wordCount" && !goalValue);

  const handleStartSession = async () => {
    if (!currentNote || !duration) return;

    const newSessionId = await onCreateSession({
      noteId: currentNote.id,
      duration: duration * 60,
      startingWordCount: currentWordCount,
      endingWordCount: 0,
      goalType,
      goalValue,
      label,
    });

    if (newSessionId) {
      await dexie.setActiveSessionId(newSessionId);
      start(newSessionId);
      setIsNewSessionOpen(false);
    }
  };

  return (
    <Modal open={isNewSessionOpen} onOpenChange={setIsNewSessionOpen}>
      <ModalContent className="space-y-2 md:max-w-md">
        <ModalHeader>
          <ModalTitle>Start A Session</ModalTitle>
          <ModalDescription>
            Set your writing intention and stay focused.
          </ModalDescription>
        </ModalHeader>

        <DurationSelector duration={duration} setDuration={setDuration} />
        <GoalTypeSelector
          goalType={goalType}
          setGoalType={setGoalType}
          setGoalValue={setGoalValue}
        />
        {goalType === "wordCount" && (
          <GoalValueInput goalValue={goalValue} setGoalValue={setGoalValue} />
        )}
        <LabelInput label={label} setLabel={setLabel} />

        <ModalFooter className="flex justify-end gap-2">
          <ModalClose asChild>
            <Button variant="outline">Cancel</Button>
          </ModalClose>
          <Button onClick={handleStartSession} disabled={isStartDisabled}>
            Start
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const DurationSelector = ({
  duration,
  setDuration,
}: {
  duration: number | null;
  setDuration: (val: number) => void;
}) => (
  <div className="space-y-1">
    <Label>Duration</Label>
    <Select
      value={duration?.toString() ?? ""}
      onValueChange={(val) => setDuration(Number(val))}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select duration (minutes)" />
      </SelectTrigger>
      <SelectContent>
        {durations.map((min) => (
          <SelectItem key={min} value={min.toString()}>
            {min} minutes
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

const GoalTypeSelector = ({
  goalType,
  setGoalType,
  setGoalValue,
}: {
  goalType: GoalType | undefined;
  setGoalType: (val: GoalType) => void;
  setGoalValue: (val: number) => void;
}) => (
  <div className="space-y-1">
    <Label>Goal Type</Label>
    <Select
      value={goalType ?? ""}
      onValueChange={(val) => {
        setGoalType(val as GoalType);
        setGoalValue(0);
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select goal type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="wordCount">Word Count</SelectItem>
        <SelectItem value="freeWrite">Free Write</SelectItem>
      </SelectContent>
    </Select>
  </div>
);

const GoalValueInput = ({
  goalValue,
  setGoalValue,
}: {
  goalValue: number;
  setGoalValue: (val: number) => void;
}) => (
  <div className="space-y-1">
    <Label>Target Word Count</Label>
    <Input
      type="number"
      min={1}
      value={goalValue ?? ""}
      onChange={(e) => setGoalValue(Number(e.target.value))}
      placeholder="Enter target words"
    />
  </div>
);

const LabelInput = ({
  label,
  setLabel,
}: {
  label: string;
  setLabel: (val: string) => void;
}) => (
  <div className="space-y-1">
    <Label>Label (optional)</Label>
    <Input
      value={label}
      onChange={(e) => setLabel(e.target.value)}
      placeholder="e.g. Morning Journal, Brain dump..."
    />
  </div>
);

export default NewSessionModal;
