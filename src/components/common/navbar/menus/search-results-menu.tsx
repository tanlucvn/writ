import DashedContainer from "@/components/ui/dashed-container";
import { FileTextIcon, PlusIcon } from "lucide-react";
import MenuItemButton from "../components/menu-item-button";

const SearchResultsMenu = ({
  items,
  onSelect,
  onCreate,
}: {
  items: { id: string; title?: string }[];
  onSelect: (item: any) => void;
  onCreate: () => void;
}) => (
  <div className="mb-2 rounded-2xl border bg-background p-1">
    <DashedContainer className="flex flex-col gap-2 rounded-xl p-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-accent"
          onClick={() => onSelect(item)}
        >
          <FileTextIcon className="h-4 w-4" />
          <p className="text-foreground text-sm">{item.title}</p>
        </div>
      ))}
      <p className="select-none font-medium font-mono text-muted-foreground text-xs">
        Search
      </p>
      <MenuItemButton
        icon={<PlusIcon />}
        label="Create new write"
        onClick={onCreate}
      />
    </DashedContainer>
  </div>
);

export default SearchResultsMenu;
