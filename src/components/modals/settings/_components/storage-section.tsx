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
import { CircleAlertIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
// import { useWritesStore } from "@/store/use-note-store";

const StorageSection = () => {
  const [open, setOpen] = useState(false);
  // const { clearDB } = useWritesStore();

  const handleDelete = async () => {
    try {
      // await clearDB();
      toast.success("All data has been deleted.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete data.");
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      <section className="mx-auto flex h-full w-full max-w-sm flex-col items-center justify-center gap-4 py-8">
        <div className="flex flex-col items-center gap-2 text-destructive">
          <CircleAlertIcon className="size-6" />
          <span className="font-medium text-sm uppercase tracking-wide">
            Danger Zone
          </span>
        </div>

        <p className="px-4 text-center text-muted-foreground text-sm">
          This will{" "}
          <span className="font-medium text-foreground">erase all</span> your
          writes, tags, and sessions stored in this browser. Be sure to{" "}
          <span className="font-medium text-foreground">
            backup anything important
          </span>{" "}
          before proceeding.
        </p>

        <Button
          size="sm"
          variant="outline"
          className="w-full border-destructive text-destructive hover:bg-destructive/10"
          onClick={() => setOpen(true)}
        >
          Delete all data
        </Button>
      </section>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-medium text-sm">
              Are you sure you want to delete everything?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs">
              This action is{" "}
              <span className="font-medium text-foreground">permanent</span> and
              will remove all data from this browser. It cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4 flex justify-end gap-2">
            <AlertDialogCancel className="h-8 px-3 text-xs">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="h-8 bg-destructive px-3 text-destructive-foreground text-xs hover:bg-destructive/90"
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default StorageSection;
