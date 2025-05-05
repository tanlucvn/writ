import { cn } from "@/lib/utils";
import { dexie } from "@/services";
import { useDialogStore } from "@/store/dialog-store";
import { ChevronLeft, ChevronRight, RotateCwIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Drawer } from "vaul";
import { Button } from "../ui/button";
import DashedContainer from "../ui/dashed-container";
import { Label } from "../ui/label";
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

              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Monthly Writing Tracker</Label>
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-8"
                    onClick={() => setCurrentDate(new Date())}
                  >
                    <RotateCwIcon />
                  </Button>
                </div>
                <div className="rounded-md bg-popover p-1">
                  <DashedContainer className="flex flex-col gap-1 p-2">
                    {/* Month Navigation */}
                    <div className="flex items-center justify-between">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handlePrevMonth}
                        className="size-8 rounded p-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      >
                        <ChevronLeft size={16} />
                      </Button>
                      <span className="font-medium text-foreground text-xs">
                        {currentDate.toLocaleString("default", {
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleNextMonth}
                        className="size-8 rounded p-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      >
                        <ChevronRight size={16} />
                      </Button>
                    </div>

                    {/* Calendar Days */}
                    <div className="flex flex-col items-center justify-center">
                      <div className="mt-2 grid w-full max-w-sm grid-cols-7 gap-2 text-center text-[10px] ">
                        {weekdays.map((day) => (
                          <span key={day}>{day}</span>
                        ))}
                      </div>
                      <div className="grid w-full max-w-sm grid-cols-7 place-items-center gap-2">
                        {Array.from({ length: daysInMonth }, (_, index) => {
                          const date = new Date(
                            Date.UTC(year, month, index + 1),
                          );
                          const formattedDate = date.toISOString().slice(0, 10); // Formatted yyyy-mm-dd
                          const dayOfMonth = (index + 1)
                            .toString()
                            .padStart(2, "0");
                          const writes = writesByDate.get(formattedDate) || 0;
                          const syncedWrites =
                            syncedWritesByDate.get(formattedDate) || 0;
                          const unsyncedWrites =
                            unsyncedWritesByDate.get(formattedDate) || 0;

                          return (
                            <Popover key={formattedDate}>
                              <PopoverTrigger asChild>
                                <div
                                  className={cn(
                                    "relative flex size-8 items-center justify-center rounded-md border text-xs",
                                    writes > 0
                                      ? "bg-primary text-primary-foreground"
                                      : "bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground",
                                    "cursor-pointer",
                                  )}
                                >
                                  {dayOfMonth}
                                </div>
                              </PopoverTrigger>
                              <PopoverContent className="w-48 p-1 text-xs">
                                <DashedContainer className="space-y-1 p-2">
                                  <p className="text-[10px] text-muted-foreground">
                                    {formattedDate}
                                  </p>
                                  <div className="flex justify-between text-foreground">
                                    <span className="font-mono text-muted-foreground">
                                      Total:
                                    </span>
                                    <span className="font-medium">
                                      {writes}
                                    </span>
                                  </div>
                                  <div className="flex justify-between text-foreground">
                                    <span className="font-mono text-muted-foreground">
                                      Synced:
                                    </span>
                                    <span className="font-medium">
                                      {syncedWrites}
                                    </span>
                                  </div>
                                  <div className="flex justify-between text-foreground">
                                    <span className="font-mono text-muted-foreground">
                                      Unsynced:
                                    </span>
                                    <span className="font-medium">
                                      {unsyncedWrites}
                                    </span>
                                  </div>
                                </DashedContainer>
                              </PopoverContent>
                            </Popover>
                          );
                        })}
                      </div>
                    </div>
                  </DashedContainer>
                </div>
                <p className="text-muted-foreground text-xs">
                  Visualize your writing activity by day. Navigate through
                  months to see your progress over time.
                </p>
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
