import { AnimatedNumberBadge } from "@/components/animated-number-badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppSettingsStore } from "@/store/app-settings-store";
import { useAppStore } from "@/store/app-store";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Separator } from "../ui/separator";

export default function WritingSection() {
  const { editorMode, setEditorMode } = useAppStore();
  const { fontFamily, setFontFamily, fontSize, setFontSize } =
    useAppSettingsStore();

  const handleDecrease = () => setFontSize(Math.max(fontSize - 1, 12));
  const handleIncrease = () => setFontSize(Math.min(fontSize + 1, 32));

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <span className="text-muted-foreground text-sm">Fonts</span>
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="hide-favicons">Write font</Label>
          <Select
            defaultValue="inter"
            value={fontFamily}
            onValueChange={setFontFamily}
          >
            <SelectTrigger className="h-8 w-[180px] text-xs">
              <SelectValue placeholder="Font Family" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="inter" className="font-sans">
                Inter (default)
              </SelectItem>
              <SelectItem value="spacegrotesk" className="font-spacegrotesk">
                Space Grotesk
              </SelectItem>
              <SelectItem value="dmsans" className="font-dmsans">
                DM Sans
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="hide-favicons">Size</Label>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-foreground transition-colors hover:bg-foreground/5"
              onClick={handleDecrease}
            >
              <MinusIcon />
            </Button>
            <AnimatedNumberBadge
              value={fontSize}
              className="flex size-8 items-center justify-center"
            />
            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-foreground transition-colors hover:bg-foreground/5"
              onClick={handleIncrease}
            >
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-2">
        <span className="text-muted-foreground text-sm">Editor Mode</span>
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="editor-mode">Mode</Label>
          <Select value={editorMode} onValueChange={setEditorMode}>
            <SelectTrigger className="h-8 w-[180px] text-xs">
              <SelectValue placeholder="Editor Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bubble">Bubble</SelectItem>
              <SelectItem value="floating">Floating</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
