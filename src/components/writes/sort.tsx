"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WRITE_SORT_OPTIONS } from "@/lib/constants";
import { useAppStore } from "@/store/app-store";
import { useState } from "react";

export default function SortDropdown() {
  const [sort, setSort] = useState("updated-desc");
  const { writes, setWrites } = useAppStore();

  const handleSort = (option: string) => {
    setSort(option);

    const sortedWrites = [...writes].sort((a, b) => {
      switch (option) {
        case "updated-desc":
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        case "updated-asc":
          return (
            new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
          );
        case "title-asc":
          return (a.title || "").localeCompare(b.title || "");
        case "title-desc":
          return (b.title || "").localeCompare(a.title || "");
        default:
          return 0;
      }
    });

    setWrites(sortedWrites);
  };

  return (
    <Select value={sort} onValueChange={handleSort}>
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
