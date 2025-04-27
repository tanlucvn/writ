import { syncDexieToSupabase, syncSupabaseToDexie } from "@/services/sync";
import { useAuthStore } from "@/store/auth-store";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";

export default function SyncSection() {
  const [syncing, setSyncing] = useState(false);
  const [syncDialogOpen, setSyncDialogOpen] = useState(false);
  const [currentSyncAction, setCurrentSyncAction] = useState<
    "dexieToSupabase" | "supabaseToDexie" | null
  >(null);
  const { user, fetchSession } = useAuthStore();

  useEffect(() => {
    if (!user) {
      fetchSession();
    }
  }, [user, fetchSession]);

  const handleSyncDexieToSupabase = () => {
    if (!user) {
      toast.error("You need to be logged in to sync your data.");
      return;
    }
    setCurrentSyncAction("dexieToSupabase");
    setSyncDialogOpen(true);
  };

  const handleSyncSupabaseToDexie = () => {
    if (!user) {
      toast.error("You need to be logged in to sync your data.");
      return;
    }
    setCurrentSyncAction("supabaseToDexie");
    setSyncDialogOpen(true);
  };

  const confirmSync = async () => {
    setSyncing(true);

    try {
      if (currentSyncAction === "dexieToSupabase") {
        await syncDexieToSupabase();
        toast.success("Successfully synced local data to the cloud.");
      } else if (currentSyncAction === "supabaseToDexie") {
        await syncSupabaseToDexie();
        toast.success("Successfully synced cloud data to local.");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        "An error occurred while syncing your data. Please try again.",
      );
    } finally {
      setSyncing(false);
      setSyncDialogOpen(false);
    }
  };

  return (
    <div className="flex flex-col space-y-5">
      <div className="flex flex-col space-y-2">
        {!user ? (
          <div className="text-left text-foreground text-sm">
            Please log in to sync your data.
          </div>
        ) : (
          <>
            <div className="flex flex-col space-y-4 p-1">
              <Button
                size="sm"
                variant="secondary"
                className="w-full border text-xs outline-double outline-2 outline-border outline-offset-2"
                onClick={handleSyncDexieToSupabase}
                disabled={syncing}
              >
                Sync Local Data to Cloud
              </Button>

              <Button
                size="sm"
                variant="ghost"
                className="w-full border text-xs outline-double outline-2 outline-border outline-offset-2"
                onClick={handleSyncSupabaseToDexie}
                disabled={syncing}
              >
                Sync Cloud Data to Local
              </Button>
            </div>
          </>
        )}
      </div>
      <hr />
      <div className="text-muted-foreground text-sm">
        Keep your writes and ideas seamlessly synced across devices and the
        cloud for an uninterrupted writing experience. Choose your preferred
        sync direction based on your needs and enjoy effortless access to your
        content anywhere.
      </div>

      <AlertDialog open={syncDialogOpen} onOpenChange={setSyncDialogOpen}>
        <AlertDialogContent className="!rounded-2xl p-1">
          <div className="h-full w-full rounded-xl border-2 border-border border-dashed p-2">
            <AlertDialogTitle className="mb-2 font-mono text-sm">
              Confirm Data Synchronization
            </AlertDialogTitle>
            <AlertDialogDescription className="flex flex-col space-y-2">
              {currentSyncAction === "dexieToSupabase" ? (
                <span>
                  You are about to sync your{" "}
                  <span className="text-foreground">
                    local data to the cloud
                  </span>
                  . This will overwrite your existing cloud data.
                </span>
              ) : (
                <span>
                  You are about to sync your cloud{" "}
                  <span className="text-foreground">
                    data to your local storage
                  </span>
                  . This will overwrite your existing local data.
                </span>
              )}

              <span>
                Please make sure you have selected the correct sync direction,
                as this action{" "}
                <span className="text-foreground">cannot be undone</span>.
              </span>
            </AlertDialogDescription>
            <AlertDialogFooter className="mt-4 gap-1">
              <AlertDialogCancel
                className="h-8 border px-2 text-xs outline-double outline-2 outline-border outline-offset-2"
                onClick={() => setSyncDialogOpen(false)}
                disabled={syncing}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="h-8 border bg-secondary px-2 text-foreground text-xs outline-double outline-2 outline-border outline-offset-2"
                onClick={confirmSync}
                disabled={syncing}
              >
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
