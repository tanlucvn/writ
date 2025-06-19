import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/use-app-store";
import { CheckIcon, Loader2Icon, XIcon } from "lucide-react";
import { useEffect } from "react";

export default function SyncIndicator() {
  const { syncStatus, setSyncStatus } = useAppStore();

  useEffect(() => {
    if (syncStatus === "success" || syncStatus === "error") {
      const timeout = setTimeout(() => {
        setSyncStatus("idle");
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [syncStatus, setSyncStatus]);

  if (syncStatus === "idle") return null;

  return (
    <div
      className={cn(
        "fixed right-2 bottom-2 flex select-none items-center gap-1 rounded-full border bg-background px-2 py-1 text-xs",
        syncStatus === "success" && "text-foreground",
        syncStatus === "error" && "text-destructive",
        syncStatus === "syncing" && "text-muted-foreground",
      )}
    >
      {syncStatus === "success" && (
        <>
          <CheckIcon className="h-3 w-3" />
          <span>Saved</span>
        </>
      )}
      {syncStatus === "error" && (
        <>
          <XIcon className="h-3 w-3" />
          <span>Save failed</span>
        </>
      )}
      {syncStatus === "syncing" && (
        <>
          <Loader2Icon className="h-3 w-3 animate-spin" />
          <span>Saving...</span>
        </>
      )}
    </div>
  );
}
