import { updateScrollView } from "@/components/editor/extensions/slash-command";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { CommandListItem } from "./command-list-item";
import type { CommandItemProps } from "./suggestions";

type CommandListProps = {
  items: CommandItemProps[];
  command: (item: CommandItemProps) => void;
};

export const CommandList = ({ items, command }: CommandListProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectItem = useCallback(
    (index: number) => {
      const item = items[index];
      if (item) command(item);
    },
    [items, command],
  );

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + items.length) % items.length);
          break;
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % items.length);
          break;
        case "Enter":
          e.preventDefault();
          selectItem(selectedIndex);
          break;
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [items.length, selectItem, selectedIndex]);

  // Reset on mount
  useEffect(() => {
    setSelectedIndex(0);
  }, []);

  // Auto scroll selected item into view
  useLayoutEffect(() => {
    const container = containerRef.current;
    const selectedItem = container?.children[selectedIndex] as HTMLElement;
    if (selectedItem && container) {
      updateScrollView(container, selectedItem);
    }
  }, [selectedIndex]);

  if (!items.length) return null;

  return (
    <div
      id="slash-command"
      ref={containerRef}
      className="z-50 flex h-60 w-32 animate-in flex-col gap-0.5 space-y-1 overflow-y-auto rounded-lg border bg-popover p-1 shadow-xl"
    >
      {items.map((item, index) => (
        <CommandListItem
          key={item.id}
          item={item}
          index={index}
          selectedIndex={selectedIndex}
          onSelect={selectItem}
        />
      ))}
    </div>
  );
};
