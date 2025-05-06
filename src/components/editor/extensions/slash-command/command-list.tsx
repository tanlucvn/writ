import { updateScrollView } from "@/components/editor/extensions/slash-command";
import { CommandListItem } from "@/components/editor/extensions/slash-command/command-list-item";
import type { CommandItemProps } from "@/components/editor/extensions/slash-command/suggestions";
import DashedContainer from "@/components/ui/dashed-container";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

export const CommandList = ({
  items,
  command,
}: {
  items: Array<CommandItemProps>;
  command: (item: CommandItemProps) => void;
  range?: any;
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const commandListContainer = useRef<HTMLDivElement>(null);

  // Handle keyboard navigation for the command list
  const selectItem = useCallback(
    (index: number) => {
      const item = items[index];
      if (item) {
        command(item);
      }
    },
    [items, command],
  );

  useEffect(() => {
    const navigationKeys = ["ArrowUp", "ArrowDown", "Enter"];
    const onKeyDown = (e: KeyboardEvent) => {
      if (navigationKeys.includes(e.key)) {
        e.preventDefault();
        if (e.key === "ArrowUp") {
          setSelectedIndex((prev) => (prev + items.length - 1) % items.length);
        } else if (e.key === "ArrowDown") {
          setSelectedIndex((prev) => (prev + 1) % items.length);
        } else if (e.key === "Enter") {
          selectItem(selectedIndex);
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [items.length, selectItem, selectedIndex]);

  useEffect(() => {
    setSelectedIndex(0);
  }, []);

  useLayoutEffect(() => {
    const container = commandListContainer.current;
    const item = container?.children[selectedIndex] as HTMLElement;
    if (item && container) {
      updateScrollView(container, item);
    }
  }, [selectedIndex]);

  if (items.length === 0) return null;

  return (
    <div
      id="slash-command"
      ref={commandListContainer}
      className="z-50 h-[330px] w-80 animate-in rounded-lg border bg-background p-1 shadow-lg"
    >
      <DashedContainer className="space-y-1 overflow-y-auto p-2">
        {items.map((item, index) => (
          <CommandListItem
            key={item.id}
            item={item}
            index={index}
            selectedIndex={selectedIndex}
            onSelect={selectItem}
          />
        ))}
      </DashedContainer>
    </div>
  );
};
