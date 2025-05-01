import { syncDexieToSupabase, syncSupabaseToDexie } from "@/services/sync";
import { useAppSettingsStore } from "@/store/app-settings-store";
import { useAuthStore } from "@/store/auth-store";
import { MoveRightIcon } from "lucide-react";
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
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";

export default function SyncSection() {
  const [syncing, setSyncing] = useState(false);
  const [syncDialogOpen, setSyncDialogOpen] = useState(false);
  const [currentSyncAction, setCurrentSyncAction] = useState<
    "dexieToSupabase" | "supabaseToDexie" | null
  >(null);
  const { user, fetchSession } = useAuthStore();
  const { syncInterval, setSyncInterval, isAutoSync, toggleAutoSync } =
    useAppSettingsStore();

  const recommendedOptions = [1, 5, 10, 15, 30, 60]; // in minutes

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
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-6">
        {!user ? (
          <div className="text-left text-foreground text-sm">
            Please log in to sync your data.
          </div>
        ) : (
          <>
            <div className="flex flex-col space-y-2">
              <span className="font-mono text-muted-foreground text-xs">
                Automation
              </span>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="auto-sync">Auto sync</Label>
                <Switch
                  id="auto-sync"
                  checked={isAutoSync}
                  onCheckedChange={toggleAutoSync}
                />
              </div>

              <Select
                disabled={!isAutoSync}
                value={syncInterval.toString()}
                onValueChange={(value) => setSyncInterval(Number(value))}
              >
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Select interval" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <div className="h-full w-full rounded-xl border-2 border-border border-dashed p-1">
                    {recommendedOptions.map((minutes) => (
                      <SelectItem key={minutes} value={minutes.toString()}>
                        <span className="font-medium text-xs">
                          Every {minutes} {minutes === 1 ? "minute" : "minutes"}
                        </span>
                      </SelectItem>
                    ))}
                  </div>
                </SelectContent>
              </Select>
              <p className="text-muted-foreground text-xs">
                Set how often to sync data automatically (in minutes).
              </p>
            </div>
            <hr />
            <div className="space-y-2">
              <span className="font-mono text-muted-foreground text-xs">
                Sync Options
              </span>
              <div className="space-y-1">
                <Label className="flex items-center gap-1">
                  <span>Local</span>
                  <MoveRightIcon className="h-3.5 w-3.5" />
                  <span>Cloud</span>
                </Label>

                <p className="text-muted-foreground text-xs">
                  This will overwrite cloud data with your current local data.
                </p>
              </div>
              <Button
                size="sm"
                variant="secondary"
                className="w-full border text-xs outline-double outline-2 outline-border outline-offset-2"
                onClick={handleSyncDexieToSupabase}
                disabled={syncing}
              >
                Sync Local to Cloud
              </Button>
            </div>

            <div className="space-y-2">
              <div className="space-y-1">
                <Label className="flex items-center gap-1">
                  <span>Cloud</span>
                  <MoveRightIcon className="h-3.5 w-3.5" />
                  <span>Local</span>
                </Label>
                <p className="text-muted-foreground text-xs">
                  This will overwrite local data with the data from cloud
                  storage.
                </p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="w-full border text-xs outline-double outline-2 outline-border outline-offset-2"
                onClick={handleSyncSupabaseToDexie}
                disabled={syncing}
              >
                Sync Cloud to Local
              </Button>
            </div>
          </>
        )}
      </div>
      <hr />
      <div className="text-muted-foreground text-sm">
        Seamlessly sync your <span className="text-foreground">ideas</span>{" "}
        across devices and the <span className="text-foreground">cloud</span>{" "}
        for a smooth writing flow.
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
