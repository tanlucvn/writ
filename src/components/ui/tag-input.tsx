import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import type { Tag } from "@/types";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import TagChip from "../tag-chip";

interface TagInputProps {
  tags: Tag[];
  setTags: (tags: Tag[]) => void;
  allTags: Tag[];
  AllTagsLabel?: ({ tag }: { tag: Tag }) => React.ReactNode;
  placeholder?: string;
  className?: string;
}

export function TagInput({
  tags,
  setTags,
  allTags,
  AllTagsLabel,
  placeholder = "Add tag...",
  className,
}: TagInputProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const filteredTags = allTags.filter(
    (tag) =>
      tag.name.toLowerCase().includes(inputValue.toLowerCase()) &&
      !tags.find((t) => t.id === tag.id),
  );

  const handleSelect = (tag: Tag) => {
    if (!tags.find((t) => t.id === tag.id)) {
      setTags([...tags, tag]);
    }
    setInputValue("");
    setOpen(true);
  };

  const handleRemove = (tag: Tag) => {
    setTags(tags.filter((t) => t.id !== tag.id));
  };

  const handleClear = () => {
    inputValue ? setInputValue("") : setTags([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && inputValue === "") {
      e.preventDefault();
      setTags(tags.slice(0, tags.length - 1));
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn("space-y-1", className)}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex flex-wrap items-center gap-2 rounded-md border px-3 py-2">
        {tags.map((tag) => (
          <TagChip
            key={tag.id}
            label={tag.name}
            onClick={() => handleRemove(tag)}
            deletable
          />
        ))}

        <input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setOpen(true);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />

        <X
          className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground"
          onClick={handleClear}
        />
      </div>

      {open && filteredTags.length > 0 && (
        <Command className="rounded-md border">
          <CommandList>
            <CommandEmpty>No tags found.</CommandEmpty>
            <CommandGroup>
              {filteredTags.map((tag) => (
                <CommandItem
                  key={tag.id}
                  value={tag.name}
                  onSelect={() => handleSelect(tag)}
                  className="cursor-pointer"
                >
                  {AllTagsLabel ? <AllTagsLabel tag={tag} /> : tag.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      )}
    </div>
  );
}
