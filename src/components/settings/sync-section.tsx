import { syncDexieToSupabase, syncSupabaseToDexie } from "@/services/sync";
import { useAppSettingsStore } from "@/store/app-settings-store";
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
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function SyncSection() {
  const [syncing, setSyncing] = useState(false);
  const [syncDialogOpen, setSyncDialogOpen] = useState(false);
  const [currentSyncAction, setCurrentSyncAction] = useState<
    "dexieToSupabase" | "supabaseToDexie" | null
  >(null);
  const { user, fetchSession } = useAuthStore();
  const { syncInterval, setSyncInterval } = useAppSettingsStore();

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
      <div className="flex flex-col space-y-4">
        {!user ? (
          <div className="text-left text-foreground text-sm">
            Please log in to sync your data.
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <p className="font-mono text-muted-foreground text-xs">
                Set the interval (in minutes) for automatic data sync.
              </p>
              <Label className="font-medium text-sm">Sync Interval</Label>
              <Input
                type="number"
                value={syncInterval}
                onChange={(e) => setSyncInterval(Number(e.target.value))}
                min={1}
                max={60}
                disabled={syncing}
              />
            </div>

            <div className="space-y-4 p-1">
              <div className="space-y-1">
                <h1 className="font-bold font-mono text-xs">
                  Sync Local Data to Cloud
                </h1>
                <p className="text-muted-foreground text-sm">
                  This will overwrite your cloud data with the local data. Make
                  sure your local data is up-to-date before syncing.
                </p>
              </div>
              <Button
                size="sm"
                variant="secondary"
                className="w-full border text-xs outline-double outline-2 outline-border outline-offset-2"
                onClick={handleSyncDexieToSupabase}
                disabled={syncing}
              >
                Sync Local Data to Cloud
              </Button>
            </div>

            <div className="space-y-4 p-1">
              <div className="space-y-1">
                <h1 className="font-bold font-mono text-xs">
                  Sync Cloud Data to Local
                </h1>
                <p className="text-muted-foreground text-sm">
                  This will overwrite your local data with the cloud data.
                  Ensure that your cloud data is up-to-date before syncing.
                </p>
              </div>
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
        Keep your <span className="text-foreground">writes</span> and ideas
        seamlessly synced across devices and the{" "}
        <span className="text-foreground">cloud</span> for an uninterrupted
        writing experience. Choose your preferred sync direction based on your
        needs and enjoy effortless access to your content anywhere.
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
