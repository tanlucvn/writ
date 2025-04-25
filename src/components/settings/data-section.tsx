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
import { useAppStore } from "@/store/app-store";
import { useState } from "react";
import { toast } from "sonner";

export default function DataSection() {
  const { clearDB } = useAppStore();
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
      <section className="rounded-xl border-2 border-destructive/50 border-dashed p-4 shadow-sm sm:border-none sm:p-0">
        <span className="font-bold font-mono text-destructive text-sm">
          Danger Zone
        </span>
        <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
          This will remove all your writes, tags, and sessions stored on this
          device. Make sure to back up anything important before continuing.
        </p>

        <div className="mt-4">
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setDeleteDialogOpen(true)}
          >
            Delete all data
          </Button>
        </div>
      </section>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete everything?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete all your data from this browser. This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>
              Yes, delete all
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
