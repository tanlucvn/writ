"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WRITE_SORT_OPTIONS } from "@/lib/constants";
import { sortWrites } from "@/lib/utils";
import { useAppSettingsStore } from "@/store/app-settings-store";
import { useAppStore } from "@/store/app-store";

export default function SortDropdown() {
  const { writes, setWrites } = useAppStore();
  const { sortOption, setSortOption } = useAppSettingsStore();

  const handleSort = (option: string) => {
    setSortOption(option);
    const sorted = sortWrites(writes, option);
    setWrites(sorted);
  };

  return (
    <Select value={sortOption} onValueChange={handleSort}>
      <SelectTrigger className="flex w-min items-center border-none px-0 text-xs shadow-none ring-offset-0 focus:outline-none focus:ring-0 focus-visible:ring-0">
        <SelectValue placeholder="Sort" />
      </SelectTrigger>

      <SelectContent>
        <div className="h-full w-full rounded-md border-2 border-border border-dashed p-1">
          <p className="px-1.5 py-1 font-mono text-muted-foreground text-xs">
            Sort by
          </p>

          {WRITE_SORT_OPTIONS.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="text-xs hover:bg-accent"
            >
              {option.label}
            </SelectItem>
          ))}
        </div>
      </SelectContent>
    </Select>
  );
}
