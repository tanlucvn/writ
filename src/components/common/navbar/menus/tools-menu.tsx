import { Button } from "@/components/ui/button";
import DashedContainer from "@/components/ui/dashed-container";
import { useAppSettingsStore } from "@/store/app-settings-store";
import { useAppStore } from "@/store/app-store";
import { useDialogStore } from "@/store/dialog-store";
import {
  ChartPieIcon,
  KeyboardIcon,
  LeafIcon,
  MusicIcon,
  SettingsIcon,
  XIcon,
} from "lucide-react";
import MenuItemButton from "../components/menu-item-button";

const ToolsMenu = () => {
  const {
    setSettingsOpen,
    setMusicPlayerOpen,
    setStatisticsOpen,
    setIsHelpDialogOpen,
  } = useDialogStore();
  const { toggleZenMode } = useAppSettingsStore();
  const { setCurrentMenu } = useAppStore();

  return (
    <div className="z-10 mx-2 mb-1 rounded-2xl border bg-background p-1">
      <DashedContainer className="relative flex flex-col gap-2 rounded-xl p-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentMenu("menu")}
          className="absolute top-2 right-2 size-fit text-muted-foreground hover:bg-transparent hover:text-foreground"
        >
          <XIcon />
        </Button>
        <div className="space-y-2">
          <p className="select-none font-medium font-mono text-muted-foreground text-xs">
            Tools
          </p>
          <div className="flex flex-col items-center justify-center gap-2">
            <MenuItemButton
              icon={<LeafIcon />}
              label="Toggle Zen Mode"
              onClick={toggleZenMode}
            />
            <MenuItemButton
              icon={<SettingsIcon />}
              label="Open Settings"
              onClick={() => setSettingsOpen(true)}
            />
            <MenuItemButton
              icon={<ChartPieIcon />}
              label="Statistics"
              onClick={() => setStatisticsOpen(true)}
            />
            <MenuItemButton
              icon={<MusicIcon />}
              label="Open Music"
              onClick={() => setMusicPlayerOpen(true)}
            />
            <MenuItemButton
              icon={<KeyboardIcon />}
              label="Keyboard Shortcuts"
              onClick={() => setIsHelpDialogOpen(true)}
            />
          </div>
        </div>
      </DashedContainer>
    </div>
  );
};

export default ToolsMenu;
