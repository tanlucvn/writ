import { Button } from "@/components/ui/button";
import {
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
} from "@/components/ui/credenza";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppStore } from "@/store/app-store";
import { useDialogStore } from "@/store/dialog-store";
import { useWritingSessionsStore } from "@/store/writing-sessions-store";
import { useState } from "react";

const WritingSessionsCreator = () => {
  const { isNewWritingSessionDialogOpen, setIsNewWritingSessionDialogOpen } =
    useDialogStore();
  const { setCurrentMenu } = useAppStore();

  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
  const { startSession } = useWritingSessionsStore();

  const handleStart = () => {
    if (!selectedDuration) return;

    startSession(selectedDuration);
    setIsNewWritingSessionDialogOpen(false);

    setCurrentMenu("none");
  };

  return (
    <Credenza
      open={isNewWritingSessionDialogOpen}
      onOpenChange={setIsNewWritingSessionDialogOpen}
    >
      <CredenzaContent className="mx-auto max-w-lg border bg-background p-1 shadow-none">
        <CredenzaHeader>
          <CredenzaDescription>
            Configure the session to your liking.
          </CredenzaDescription>
          <CredenzaTitle>Create Writing Session</CredenzaTitle>
        </CredenzaHeader>

        <div className="mt-4 space-y-4">
          <Select
            onValueChange={(val) => setSelectedDuration(Number(val))}
            value={selectedDuration ? String(selectedDuration) : ""}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 15].map((min) => (
                <SelectItem key={min} value={String(min)}>
                  {min} minutes
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            className="w-full"
            onClick={handleStart}
            disabled={!selectedDuration}
          >
            Start
          </Button>
        </div>
      </CredenzaContent>
    </Credenza>
  );
};

export default WritingSessionsCreator;
