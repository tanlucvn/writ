import { Button } from "@/components/ui/button";
import {
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
} from "@/components/ui/credenza";
import DashedContainer from "@/components/ui/dashed-container";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDialogStore } from "@/store/dialog-store";
import { useWritingSessionsStore } from "@/store/writing-sessions-store";
import { useState } from "react";

const WritingSessionsCreator = () => {
  const { isNewWritingSessionDialogOpen, setIsNewWritingSessionDialogOpen } =
    useDialogStore();

  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
  const { startSession } = useWritingSessionsStore();

  const handleStart = () => {
    if (!selectedDuration) return;

    startSession(selectedDuration);
    setIsNewWritingSessionDialogOpen(false);
  };

  return (
    <Credenza
      open={isNewWritingSessionDialogOpen}
      onOpenChange={setIsNewWritingSessionDialogOpen}
    >
      <CredenzaContent className="mx-auto max-w-lg border bg-background p-1 shadow-none">
        <DashedContainer className="p-6">
          <CredenzaHeader className="p-0">
            <CredenzaDescription className="font-mono text-muted-foreground text-xs">
              Configure the session to your liking.
            </CredenzaDescription>
            <CredenzaTitle className="font-medium text-foreground text-sm">
              Create writing session
            </CredenzaTitle>
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
        </DashedContainer>
      </CredenzaContent>
    </Credenza>
  );
};

export default WritingSessionsCreator;
