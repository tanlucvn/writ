import { IconRenderer } from "@/components/icon-renderer";
import {} from "@/components/ui/collapsible";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useDialogStore } from "@/store/use-dialog-store";

const SidebarToolsMenu = () => {
  const { setSettingsOpen, setStatisticsOpen, setIsShortcutsModalOpen } =
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
        <SidebarMenuButton onClick={() => setStatisticsOpen(true)}>
          <IconRenderer name="ChartPie" />
          Statistics
        </SidebarMenuButton>
      </SidebarMenuItem>

      <SidebarMenuItem>
        <SidebarMenuButton onClick={() => setIsShortcutsModalOpen(true)}>
          <IconRenderer name="Keyboard" />
          Keyboard Shortcuts
        </SidebarMenuButton>
      </SidebarMenuItem>
    </div>
  );
};

export default SidebarToolsMenu;
