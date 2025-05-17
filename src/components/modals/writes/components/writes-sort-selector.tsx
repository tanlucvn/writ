"use client";

import DashedContainer from "@/components/ui/dashed-container";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WRITE_SORT_OPTIONS_GROUPED } from "@/lib/constants";
import { sortWrites } from "@/lib/utils";
import { useAppSettingsStore } from "@/store/app-settings-store";
import { useWritesStore } from "@/store/writes-store";
import { CheckIcon } from "lucide-react";

const WritesSortSelector = () => {
  const { writes, setWrites } = useWritesStore();
  const { sortOption, setSortOption } = useAppSettingsStore();

  const handleSort = (option: string) => {
    setSortOption(option);
    const sorted = sortWrites(writes, option);
    setWrites(sorted);
  };

  const selectedGroup = WRITE_SORT_OPTIONS_GROUPED.find((group) =>
    group.options.some((opt) => opt.value === sortOption),
  );

  const selectedLabel =
    selectedGroup?.options.find((opt) => opt.value === sortOption)?.label ?? "";

  return (
    <Select value={sortOption} onValueChange={handleSort}>
      <SelectTrigger className="flex w-min items-center border-none px-2 py-1 text-xs shadow-none ring-offset-0 focus:outline-none focus:ring-0 focus-visible:ring-0">
        <SelectValue placeholder="Sort" defaultValue={sortOption}>
          {selectedLabel}
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        <DashedContainer className="p-1">
          <p className="px-1.5 py-1 font-mono text-muted-foreground text-xs">
            Group By
          </p>

          {WRITE_SORT_OPTIONS_GROUPED.map(({ group, options }) => (
            <div
              key={group}
              className="flex cursor-pointer items-center justify-between rounded-sm px-1.5 py-1 text-xs hover:bg-accent"
              onClick={() => handleSort(options[0].value)}
            >
              <span>{group}</span>
              {selectedGroup?.group === group && (
                <CheckIcon className="h-3.5 w-3.5 text-muted-foreground" />
              )}
            </div>
          ))}

          <hr className="my-2 border-muted border-dashed" />

          <p className="px-1.5 py-1 font-mono text-muted-foreground text-xs">
            Sort By
          </p>

          {selectedGroup?.options.map(({ label, value }) => (
            <div
              key={value}
              onClick={() => handleSort(value)}
              className="flex cursor-pointer items-center justify-between rounded-sm px-1.5 py-1 text-xs hover:bg-accent"
            >
              <span>{label}</span>
              {sortOption === value && (
                <CheckIcon className="h-3.5 w-3.5 text-muted-foreground" />
              )}
            </div>
          ))}
        </DashedContainer>
      </SelectContent>
    </Select>
  );
};

export default WritesSortSelector;
