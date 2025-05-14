import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useWritesStore } from "@/store/writes-store";
import { CheckIcon, CircleAlertIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import DashedContainer from "../ui/dashed-container";

const StorageSection = () => {
  const { clearDB } = useWritesStore();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleConfirmDelete = async () => {
    try {
      await clearDB();
      toast.success("All data has been deleted.");
    } catch (error) {
      toast.error("Something went wrong while deleting.");
      console.error(error);
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  return (
    <>
      <section className="flex h-[330px] w-full flex-col items-center justify-center space-y-4 p-1">
        <div className="flex flex-col items-center justify-center space-y-2 text-destructive">
          <CircleAlertIcon className="size-8" />
          <span className="font-bold font-mono text-xs">Danger Zone</span>
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed">
          This will <span className="text-foreground">remove all</span> your
          writes, tags, and sessions stored on this device. Please make sure
          you've <span className="text-foreground">saved</span> anything
          important before you continue.
        </p>

        <Button
          size="sm"
          variant="secondary"
          className="w-full outline-double outline-2 outline-border outline-offset-2"
          onClick={() => setDeleteDialogOpen(true)}
        >
          Delete all data
        </Button>
      </section>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="p-1">
          <DashedContainer className="p-2">
            <AlertDialogHeader>
              <AlertDialogTitle className="mb-2 font-mono text-sm">
                Delete everything?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently{" "}
                <span className="text-foreground">delete all</span> your data
                from this browser. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-4 gap-1">
              <AlertDialogCancel className="h-8 border bg-secondary px-2 text-secondary-foreground text-xs outline-double outline-1 outline-border outline-offset-2 hover:bg-secondary/90">
                <XIcon />
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="h-8 border bg-primary px-2 text-primary-foreground text-xs outline-double outline-1 outline-primary outline-offset-2 hover:bg-primary/90"
                onClick={handleConfirmDelete}
              >
                <CheckIcon />
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </DashedContainer>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default StorageSection;
