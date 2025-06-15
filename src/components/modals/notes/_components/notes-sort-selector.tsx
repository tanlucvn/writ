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
import { SORT_OPTIONS_GROUPED } from "@/lib/constants";
import { sortWrites } from "@/lib/utils";
import { useAppSettingsStore } from "@/store/use-app-settings-store";
import { useNoteStore } from "@/store/use-note-store";

const NotesSortSelector = () => {
  const { notes, setNotes } = useNoteStore();
  const { sortOption, setSortOption } = useAppSettingsStore();

  const handleSort = (value: string) => {
    setSortOption(value);
    const sorted = sortWrites(notes, value);
    setNotes(sorted);
  };

  return (
    <Select value={sortOption} onValueChange={handleSort}>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Sort" />
      </SelectTrigger>

      <SelectContent>
        {SORT_OPTIONS_GROUPED.map(({ group, options }) => (
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

export default NotesSortSelector;
