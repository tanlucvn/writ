"use client";

import { useAppSettingsStore } from "@/store/app-settings-store";
import { useUser } from "@clerk/nextjs";
import DashedContainer from "../ui/dashed-container";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";

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
            <h3 className="font-medium text-muted-foreground text-xs">
              Auto Sync
            </h3>

            <div className="flex items-center justify-between">
              <span className="text-sm">Enable</span>
              <Switch checked={isAutoSync} onCheckedChange={toggleAutoSync} />
            </div>

            <Select
              disabled={!isAutoSync}
              value={syncInterval.toString()}
              onValueChange={(val) => setSyncInterval(Number(val))}
            >
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Interval" />
              </SelectTrigger>
              <SelectContent>
                <DashedContainer className="p-1">
                  {recommendedOptions.map((s) => (
                    <SelectItem
                      key={s}
                      value={s.toString()}
                      className="text-xs"
                    >
                      Every {s} {s === 1 ? "second" : "seconds"}
                    </SelectItem>
                  ))}
                </DashedContainer>
              </SelectContent>
            </Select>

            <p className="text-muted-foreground text-xs">
              Set how often to sync data automatically (in seconds).
            </p>
          </div>

          <hr />

          <div className="text-muted-foreground text-xs italic">
            Seamless sync across{" "}
            <span className="font-medium text-foreground">devices</span> and the{" "}
            <span className="font-medium text-foreground">cloud</span>.
          </div>
        </>
      )}
    </div>
  );
};

export default SyncSection;
