import { useAppStore } from "@/store/use-app-store";
import { CheckIcon, XIcon } from "lucide-react";
import { useEffect } from "react";

const SyncIndicator = () => {
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
    <>
      {syncStatus === "success" && (
        <span className="flex items-center gap-1">
          <CheckIcon className="h-3 w-3" /> Saved
        </span>
      )}
      {syncStatus === "error" && (
        <span className="flex items-center gap-1">
          <XIcon className="h-3 w-3" /> Save failed
        </span>
      )}
      {syncStatus === "syncing" && (
        <span className="text-muted-foreground">Saving...</span>
      )}
    </>
  );
};

export default SyncIndicator;
