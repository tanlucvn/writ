"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SESSION_SORT_OPTIONS } from "@/lib/constants";
import { sortSessions } from "@/lib/utils";
import { useSessionStore } from "@/store/use-session-store";
import { useState } from "react";

const SessionSortSelector = () => {
  const { sessions, setSessions } = useSessionStore();
  const [sortOption, setSortOption] = useState("newest");

  const handleSort = (value: string) => {
    setSortOption(value);
    const sorted = sortSessions(sessions, value);
    setSessions(sorted);
  };

  return (
    <Select value={sortOption} onValueChange={handleSort}>
      <SelectTrigger className="!h-8 w-[150px] font-medium text-xs">
        <SelectValue placeholder="Sort" />
      </SelectTrigger>

      <SelectContent>
        {SESSION_SORT_OPTIONS.map(({ group, options }) => (
          <SelectGroup key={group}>
            <SelectLabel className="font-mono text-muted-foreground text-xs">
              {group}
            </SelectLabel>
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="text-xs"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SessionSortSelector;
