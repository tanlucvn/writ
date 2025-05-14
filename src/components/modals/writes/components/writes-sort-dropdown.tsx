"use client";

import DashedContainer from "@/components/ui/dashed-container";
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
import { useWritesStore } from "@/store/writes-store";

const WritesSortDropdown = () => {
  const { writes, setWrites } = useWritesStore();
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
        <DashedContainer className="p-1">
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
        </DashedContainer>
      </SelectContent>
    </Select>
  );
};

export default WritesSortDropdown;
