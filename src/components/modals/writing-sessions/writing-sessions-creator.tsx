import { Button } from "@/components/ui/button";
import {
  Modal,
  ModalContent,
  ModalDescription,
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
    <Modal
      open={isNewWritingSessionDialogOpen}
      onOpenChange={setIsNewWritingSessionDialogOpen}
    >
      <ModalContent>
        <ModalHeader>
          <ModalDescription>
            Configure the session to your liking.
          </ModalDescription>
          <ModalTitle>Create Writing Session</ModalTitle>
        </ModalHeader>

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
      </ModalContent>
    </Modal>
  );
};

export default WritingSessionsCreator;
