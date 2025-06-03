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
import { TagInput } from "@/components/ui/tag-input";
import WriteColorSelector from "@/components/write-color-selector";
import { dexie } from "@/services";
import { useDialogStore } from "@/store/dialog-store";
import { useWritesStore } from "@/store/writes-store";
import type { Write, WriteColor } from "@/types";
import {} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function WriteEditDialog() {
  const {
    currentEditWrite,
    tags: allTags,
    setWrites,
    writes,
    refreshWrites,
    currentWrite,
    setCurrentWrite,
  } = useWritesStore();
  const { isWritesEditingDialogOpen, setIsWritesEditingDialogOpen } =
    useDialogStore();

  const [title, setTitle] = useState("");
  const [tagIds, setTagIds] = useState<string[]>([]);
  const [color, setColor] = useState<"default" | WriteColor>("default");

  useEffect(() => {
    if (isWritesEditingDialogOpen && currentEditWrite) {
      setTitle(currentEditWrite.title || "");
      setTagIds(currentEditWrite.tagIds || []);
      setColor(currentEditWrite.color || "default");
    } else {
      setTitle("");
      setTagIds([]);
      setColor("default");
    }
  }, [isWritesEditingDialogOpen, currentEditWrite]);

  if (!currentEditWrite) return null;

  const selectedTags = allTags.filter((tag) => tagIds.includes(tag.id));

  const handleSave = async () => {
    const trimmed = title.trim();
    if (!trimmed) {
      alert("Title cannot be empty.");
      return;
    }

    const updatedWrite: Write = {
      ...currentEditWrite,
      title: trimmed,
      tagIds,
      color,
    };

    const updatedWritesList = writes.map((w) =>
      w.id === updatedWrite.id ? updatedWrite : w,
    );

    try {
      await dexie.saveWrite(updatedWrite);
      setWrites(updatedWritesList);

      if (currentEditWrite.id === currentWrite?.id) {
        setCurrentWrite(updatedWrite);
      }

      await refreshWrites();
      setIsWritesEditingDialogOpen(false);
    } catch (error) {
      console.error("Failed to save write:", error);
      toast.error("Failed to save. Please try again.");
    }
  };

  return (
    <Modal
      open={isWritesEditingDialogOpen}
      onOpenChange={setIsWritesEditingDialogOpen}
    >
      <ModalContent>
        <ModalHeader>
          <ModalDescription>Make changes to this write.</ModalDescription>
          <ModalTitle>Edit Write</ModalTitle>
        </ModalHeader>

        <div className="mt-4 flex flex-col gap-4 text-xs">
          <div className="space-y-2">
            <Label htmlFor="write-title">Title</Label>
            <Input
              id="write-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="h-8"
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <TagInput
              tags={selectedTags}
              setTags={(tags) => setTagIds(tags.map((t) => t.id))}
              allTags={allTags}
              placeholder="Add tag"
            />
          </div>

          <div className="space-y-2">
            <Label>Color</Label>
            <WriteColorSelector
              defaultColour={color}
              onValueChange={(value) => setColor(value)}
              disabled={false}
            />
            <span className="block font-normal text-muted-foreground text-xs">
              Highlight this write with a color
            </span>
          </div>
        </div>

        <ModalFooter className="!flex-col flex gap-2 px-0">
          <Button onClick={handleSave} className="w-full">
            Save
          </Button>
          <ModalClose asChild>
            <Button variant="secondary" className="w-full">
              Close
            </Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
