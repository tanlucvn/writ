import { cn } from "@/lib/utils";
import { dexie } from "@/services";
import { useDialogStore } from "@/store/dialog-store";
import { ChevronLeft, ChevronRight, RotateCwIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Drawer } from "vaul";
import { Button } from "../ui/button";
import DashedContainer from "../ui/dashed-container";
import { Label } from "../ui/label";
// import DashedContainer from "../ui/dashed-container";
// import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const Statistics = () => {
  const [writesByDate, setWritesByDate] = useState<Map<string, number>>(
    new Map(),
  );
  const [syncedWritesByDate, setSyncedWritesByDate] = useState<
    Map<string, number>
  >(new Map());
  const [unsyncedWritesByDate, setUnsyncedWritesByDate] = useState<
    Map<string, number>
  >(new Map());
  const { isStatisticsOpen, setStatisticsOpen } = useDialogStore();
  const [currentDate, setCurrentDate] = useState(new Date());

  const [totalWrites, setTotalWrites] = useState(0);
  const [syncedWrites, setSyncedWrites] = useState(0);
  const [unsyncedWrites, setUnsyncedWrites] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      const writesData = await dexie.getWriteCountByDay();
      setWritesByDate(writesData);

      const syncedWritesData = await dexie.getSyncedWriteCountByDay();
      setSyncedWritesByDate(syncedWritesData);

      const unsyncedWritesData = await dexie.getUnsyncedWriteCountByDay();
      setUnsyncedWritesByDate(unsyncedWritesData);

      const total = await dexie.getTotalWriteCount();
      setTotalWrites(total);

      const synced = await dexie.getSyncedWriteCount();
      setSyncedWrites(synced);

      const unsynced = await dexie.getUnsyncedWriteCount();
      setUnsyncedWrites(unsynced);
    };
    fetchStats();
  }, []);

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const handlePrevMonth = () => {
    const prevMonth = new Date(currentDate);
    prevMonth.setMonth(month - 1);
    setCurrentDate(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(currentDate);
    nextMonth.setMonth(month + 1);
    setCurrentDate(nextMonth);
  };

  return (
    <Drawer.Root
      direction="right"
      open={isStatisticsOpen}
      onOpenChange={setStatisticsOpen}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-20 bg-black/40" />
        <Drawer.Content className="fixed right-0 bottom-0 z-40 h-full w-full overflow-hidden rounded-none border bg-background p-1 shadow-xl outline-none sm:w-[450px] sm:max-w-md sm:rounded-tl-xl sm:rounded-bl-xl md:max-w-lg">
          <div className="flex h-full w-full flex-col rounded-xl border-2 border-border border-dashed sm:rounded-tr-none sm:rounded-br-none">
            <div className="flex flex-col gap-4 px-4 pt-4">
              <div className="relative flex flex-col gap-1">
                <p className="font-mono text-muted-foreground text-xs">
                  Track your writing activity by month.
                </p>
                <Drawer.Title className="font-medium text-base text-foreground">
                  Writing Statistics
                </Drawer.Title>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-0 size-8"
                  onClick={() => setStatisticsOpen(false)}
                >
                  <XIcon />
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center text-foreground text-sm">
                <div className="flex flex-col items-center justify-center rounded-md border bg-secondary py-2 outline-double outline-2 outline-border outline-offset-2">
                  <span className="text-muted-foreground text-xs">Total</span>
                  <span className="font-semibold">{totalWrites}</span>
                </div>
                <div className="flex flex-col items-center justify-center rounded-md border bg-secondary py-2 outline-double outline-2 outline-border outline-offset-2">
                  <span className="text-muted-foreground text-xs">Synced</span>
                  <span className="font-semibold">{syncedWrites}</span>
                </div>
                <div className="flex flex-col items-center justify-center rounded-md border bg-secondary py-2 outline-double outline-2 outline-border outline-offset-2">
                  <span className="text-muted-foreground text-xs">
                    Unsynced
                  </span>
                  <span className="font-semibold">{unsyncedWrites}</span>
                </div>
              </div>

              <div className="space-y-2">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <Label className="font-semibold">Writing Calendar</Label>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCurrentDate(new Date())}
                    className="size-8"
                  >
                    <RotateCwIcon className="size-4" />
                  </Button>
                </div>

                <div className="mx-auto max-w-[320px] space-y-2 md:max-w-none">
                  {/* Month Navigation */}
                  <div className="flex items-center justify-between font-medium text-sm">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handlePrevMonth}
                      className="size-8"
                    >
                      <ChevronLeft className="size-4" />
                    </Button>
                    <span className="text-foreground">
                      {currentDate.toLocaleString("default", {
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleNextMonth}
                      className="size-8"
                    >
                      <ChevronRight className="size-4" />
                    </Button>
                  </div>

                  {/* Weekday Labels */}
                  <div className="grid grid-cols-7 text-center text-muted-foreground text-xs">
                    {weekdays.map((day) => (
                      <div key={day} className="py-1">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1 sm:gap-2">
                    {(() => {
                      const firstDay = new Date(Date.UTC(year, month, 1));
                      const firstWeekday = firstDay.getUTCDay();
                      const cells = [];

                      for (let i = 0; i < firstWeekday; i++) {
                        cells.push(
                          <div key={`empty-${i}`} className="aspect-square" />,
                        );
                      }

                      for (let i = 0; i < daysInMonth; i++) {
                        const date = new Date(Date.UTC(year, month, i + 1));
                        const formattedDate = date.toISOString().slice(0, 10);
                        const writes = writesByDate.get(formattedDate) || 0;

                        let bg = "bg-muted";
                        if (writes >= 20) bg = "bg-primary";
                        else if (writes >= 10) bg = "bg-primary/70";
                        else if (writes >= 5) bg = "bg-primary/50";
                        else if (writes >= 1) bg = "bg-primary/30";

                        cells.push(
                          <Popover key={formattedDate}>
                            <PopoverTrigger asChild>
                              <div
                                className={cn(
                                  "flex aspect-square w-full max-w-[42px] cursor-pointer items-center justify-center rounded-md border text-[11px] sm:max-w-[48px] sm:text-xs",
                                  bg,
                                )}
                              >
                                {i + 1}
                              </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-44 p-1 text-xs">
                              <DashedContainer className="select-none p-2">
                                <p className="mb-1 text-[10px] text-muted-foreground">
                                  {formattedDate}
                                </p>
                                <div className="flex justify-between">
                                  <span className="font-mono text-muted-foreground">
                                    Total
                                  </span>
                                  <span>{writes}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="font-mono text-muted-foreground">
                                    Synced
                                  </span>
                                  <span>
                                    {syncedWritesByDate.get(formattedDate) || 0}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="font-mono text-muted-foreground">
                                    Unsynced
                                  </span>
                                  <span>
                                    {unsyncedWritesByDate.get(formattedDate) ||
                                      0}
                                  </span>
                                </div>
                              </DashedContainer>
                            </PopoverContent>
                          </Popover>,
                        );
                      }

                      return cells;
                    })()}
                  </div>
                </div>

                {/* Legend */}
                <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs">
                  <span>Less</span>
                  <div className="h-3 w-3 rounded-sm bg-muted" />
                  <div className="h-3 w-3 rounded-sm bg-primary/30" />
                  <div className="h-3 w-3 rounded-sm bg-primary/50" />
                  <div className="h-3 w-3 rounded-sm bg-primary/70" />
                  <div className="h-3 w-3 rounded-sm bg-primary" />
                  <span>More</span>
                </div>
              </div>
            </div>
          </div>
        </Drawer.Content>
        <Drawer.Overlay />
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default Statistics;
