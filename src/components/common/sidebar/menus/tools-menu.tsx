import { IconRenderer } from "@/components/icon-renderer";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useDialogStore } from "@/store/use-dialog-store";

const SidebarToolsMenu = () => {
  const { setSettingsOpen, setIsKeyboardShortcutsOpen, setIsStatisticsOpen } =
    useDialogStore();

  return (
    <div className="flex flex-col gap-1">
      <SidebarMenuItem>
        <SidebarMenuButton onClick={() => setSettingsOpen(true)}>
          <IconRenderer name="Settings" />
          Open Settings
        </SidebarMenuButton>
      </SidebarMenuItem>

      <SidebarMenuItem>
        <SidebarMenuButton onClick={() => setIsStatisticsOpen(true)}>
          <IconRenderer name="ChartPie" />
          Statistics
        </SidebarMenuButton>
      </SidebarMenuItem>

      <SidebarMenuItem>
        <SidebarMenuButton onClick={() => setIsKeyboardShortcutsOpen(true)}>
          <IconRenderer name="Keyboard" />
          Keyboard Shortcuts
        </SidebarMenuButton>
      </SidebarMenuItem>
    </div>
  );
};

export default SidebarToolsMenu;
