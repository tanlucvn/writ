import EditorToolbar from "../editor/editor-toolbar";
import { Separator } from "../ui/separator";
import CreateWriteButton from "./create-write-button";
import ToolbarFontSelect from "./font-select";
import ToolbarFontSize from "./font-size";
import ToolbarTimeDisplay from "./time-display";
import ToolbarWordCount from "./word-count";
import WriteHistory from "./write-history";

export default function Toolbar() {
  return (
    <div className="fixed right-0 bottom-0 left-0 flex items-center justify-between border-t px-4 py-2 opacity-70 backdrop-blur-sm transition-opacity duration-300 hover:opacity-100">
      <EditorToolbar />
      <div className="flex items-center justify-center gap-4">
        <ToolbarFontSize />
        <ToolbarFontSelect />
      </div>

      <div className="flex items-center justify-center gap-4">
        <div className="flex items-center justify-center gap-2">
          <CreateWriteButton />
          <WriteHistory />
        </div>

        <Separator orientation="vertical" className="h-4 w-px bg-border" />

        <ToolbarTimeDisplay />
        <ToolbarWordCount />
      </div>
    </div>
  );
}
