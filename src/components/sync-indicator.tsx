import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/app-store";
import { Check, X } from "lucide-react";
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
    <div
      className={cn(
        "rounded-full border border-border bg-secondary px-2 py-1 text-muted-foreground text-xs",
        "outline-double outline-2 outline-border outline-offset-2",
      )}
    >
      {syncStatus === "success" ? (
        <span className="flex items-center gap-1">
          <Check className="h-3 w-3" /> Saved
        </span>
      ) : syncStatus === "error" ? (
        <span className="flex items-center gap-1">
          <X className="h-3 w-3" /> Save failed
        </span>
      ) : (
        <span className="text-muted-foreground">Saving...</span>
      )}
    </div>
  );
};

export default SyncIndicator;
