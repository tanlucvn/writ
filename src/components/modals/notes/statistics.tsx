"use client";

import { IconRenderer } from "@/components/icon-renderer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { dexie } from "@/services";
import { useDialogStore } from "@/store/use-dialog-store";
import { ChevronLeft, ChevronRight, RotateCwIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Drawer } from "vaul";

const getNoteBgColor = (count: number) => {
  if (count === 0) return "bg-muted text-muted-foreground";
  if (count < 3) return "bg-primary/40 text-primary-foreground";
  if (count < 5) return "bg-primary/80 text-primary-foreground";
  if (count < 10) return "bg-primary text-primary-foreground";
};

const Statistics = () => {
  const { isStatisticsOpen, setIsStatisticsOpen } = useDialogStore();
  const [currentDate, setCurrentDate] = useState(new Date());

  const [total, setTotal] = useState(0);
  const [active, setActive] = useState(0);
  const [trashed, setTrashed] = useState(0);

  const [byDay, setByDay] = useState(new Map<string, number>());
  const [activeByDay, setActiveByDay] = useState(new Map<string, number>());
  const [trashedByDay, setTrashedByDay] = useState(new Map<string, number>());

  useEffect(() => {
    const load = async () => {
      setByDay(await dexie.getNoteCountByDay());
      setActiveByDay(await dexie.getActiveNoteCountByDay());
      setTrashedByDay(await dexie.getTrashedNoteCountByDay());
      setTotal(await dexie.getTotalNoteCount());
      setActive(await dexie.getActiveNoteCount());
      setTrashed(await dexie.getTrashedNoteCount());
    };
    load();
  }, []);

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  ).getDate();
  const firstWeekday = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  ).getDay();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const changeMonth = (offset: number) => {
    const d = new Date(currentDate);
    d.setMonth(month + offset);
    setCurrentDate(d);
  };

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <Drawer.Root
      open={isStatisticsOpen}
      onOpenChange={setIsStatisticsOpen}
      direction="right"
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-40 bg-black/40" />
        <Drawer.Content className="fixed top-0 right-0 bottom-0 z-50 flex h-full w-full flex-col gap-4 overflow-hidden rounded-xl border bg-background p-4 shadow-xl sm:top-2 sm:right-2 sm:bottom-2 sm:h-[98%] sm:max-w-md">
          {/* Header */}
          <div className="shrink-0 pb-2">
            <Drawer.Title className="font-medium text-base text-foreground">
              Note Statistics
            </Drawer.Title>
            <Drawer.Description className="text-muted-foreground text-xs">
              Track your note activity by month.
            </Drawer.Description>

            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4"
              onClick={() => setIsStatisticsOpen(false)}
            >
              <IconRenderer name="X" />
            </Button>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-3 gap-3 text-center text-sm">
            {[
              { label: "Total", value: total },
              { label: "Active", value: active },
              { label: "Trash", value: trashed },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-md border bg-secondary py-2">
                <div className="text-muted-foreground text-xs">{label}</div>
                <div className="font-semibold">{value}</div>
              </div>
            ))}
          </div>

          {/* Calendar */}
          <div className="space-y-2">
            {/* Header */}
            <div className="flex items-center justify-between">
              <Label>Note Calendar</Label>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentDate(new Date())}
              >
                <RotateCwIcon className="size-4" />
              </Button>
            </div>

            {/* Month Navigation */}
            <div className="flex items-center justify-between font-medium text-sm">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => changeMonth(-1)}
              >
                <ChevronLeft className="size-4" />
              </Button>
              <span>
                {currentDate.toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => changeMonth(1)}
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>

            {/* Weekdays */}
            <div className="grid grid-cols-7 text-center text-muted-foreground text-xs">
              {weekdays.map((day) => (
                <div key={day} className="py-1">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstWeekday }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const date = new Date(Date.UTC(year, month, day));
                const iso = date.toISOString().split("T")[0];
                const count = byDay.get(iso) || 0;

                const bg = cn(
                  "flex aspect-square items-center justify-center rounded-md border text-xs sm:text-sm",
                  getNoteBgColor(count),
                );

                return (
                  <Popover key={iso}>
                    <PopoverTrigger asChild>
                      <div className={bg}>{day}</div>
                    </PopoverTrigger>
                    <PopoverContent className="w-44 select-none text-xs">
                      <p className="mb-1 text-[10px] text-muted-foreground">
                        {iso}
                      </p>
                      <div className="flex justify-between">
                        <span>Total</span>
                        <span>{count}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Active</span>
                        <span>{activeByDay.get(iso) || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Trash</span>
                        <span>{trashedByDay.get(iso) || 0}</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                );
              })}
            </div>

            <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs">
              <span>None</span>
              <div className="h-3 w-3 rounded-xs bg-muted" />
              <div className="h-3 w-3 rounded-xs bg-primary/40" />
              <div className="h-3 w-3 rounded-xs bg-primary/80" />
              <div className="h-3 w-3 rounded-xs bg-primary" />
              <span>More</span>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default Statistics;
