"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useAppSettingsStore } from "@/store/use-app-settings-store";
import { useUser } from "@clerk/nextjs";

const recommendedOptions = [5, 10, 30, 60, 120, 300];

const SyncSection = () => {
  const { isAutoSync, toggleAutoSync, syncInterval, setSyncInterval } =
    useAppSettingsStore();
  const { user } = useUser();
  return (
    <div className="flex flex-col gap-6">
      {!user ? (
        <div className="text-muted-foreground text-xs italic">
          Please <span className="text-foreground">Sign in</span> to sync your
          data.
        </div>
      ) : (
        <>
          <div className="space-y-3">
            <Label className="text-muted-foreground text-xs">Auto Sync</Label>

            <div className="flex items-center justify-between">
              <Label>Enable</Label>
              <Switch checked={isAutoSync} onCheckedChange={toggleAutoSync} />
            </div>

            <div className="flex items-center justify-between">
              <Label>Sync Interval</Label>
              <Select
                disabled={!isAutoSync}
                value={syncInterval.toString()}
                onValueChange={(val) => setSyncInterval(Number(val))}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue placeholder="Interval" />
                </SelectTrigger>
                <SelectContent>
                  {recommendedOptions.map((s) => (
                    <SelectItem
                      key={s}
                      value={s.toString()}
                      className="text-xs"
                    >
                      Every {s} {s === 1 ? "second" : "seconds"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <p className="text-muted-foreground text-xs">
              Set how often to sync data automatically.
            </p>
          </div>

          <hr />

          <div className="rounded-md border px-3 py-2 text-muted-foreground text-xs">
            Syncing ensures your data is kept up to date across{" "}
            <span className="font-medium text-foreground">devices</span> and{" "}
            <span className="font-medium text-foreground">cloud</span> storage.
          </div>
        </>
      )}
    </div>
  );
};

export default SyncSection;
