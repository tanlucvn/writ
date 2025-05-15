import {
  AppWindowMacIcon,
  CommandIcon,
  PenIcon,
  SearchIcon,
} from "lucide-react";
import IconButton from "../components/menu-icon-button";

const MainMenu = ({
  onOpenWrites,
  onOpenSearch,
  onOpenPages,
  onOpenTools,
}: {
  onOpenWrites: () => void;
  onOpenSearch: () => void;
  onOpenPages: () => void;
  onOpenTools: () => void;
}) => (
  <div className="flex h-full w-full items-center gap-[10px]">
    <IconButton icon={<CommandIcon />} onClick={onOpenTools} label="Tools" />
    <IconButton
      icon={<PenIcon />}
      onClick={onOpenWrites}
      label="Writes | Writing Sessions"
    />
    <IconButton icon={<SearchIcon />} onClick={onOpenSearch} label="Search" />
    <IconButton
      icon={<AppWindowMacIcon />}
      onClick={onOpenPages}
      label="Pages"
    />
  </div>
);

export default MainMenu;
