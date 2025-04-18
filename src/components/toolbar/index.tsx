import ToolbarThemeToggle from "./toolbar-theme-toggle";
import ToolbarToggle from "./toolbar-toggle";

export default function Toolbar() {
  return (
    <div className="fixed right-0 bottom-0 left-0 flex items-center justify-between border-t px-4 py-2 opacity-70 backdrop-blur-sm transition-opacity duration-300 hover:opacity-100">
      Toolbar
      <div className="flex items-center justify-center gap-2">
        <ToolbarThemeToggle />
        <ToolbarToggle />
      </div>
    </div>
  );
}
