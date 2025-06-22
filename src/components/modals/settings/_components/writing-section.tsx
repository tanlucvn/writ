import { NumberFlowBadge } from "@/components/number-flow-badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppSettingsStore } from "@/store/use-app-settings-store";
import { MinusIcon, PlusIcon } from "lucide-react";

const WritingSection = () => {
  const { fontFamily, setFontFamily, fontSize, setFontSize } =
    useAppSettingsStore();

  const handleDecrease = () => setFontSize(Math.max(fontSize - 1, 12));
  const handleIncrease = () => setFontSize(Math.min(fontSize + 1, 32));

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-2">
        <Label className="text-muted-foreground text-xs">Fonts</Label>
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
              <SelectItem
                value="inter"
                className="font-sans text-xs hover:bg-accent"
              >
                Inter (default)
              </SelectItem>
              <SelectItem
                value="geist"
                className="font-spacegrotesk text-xs hover:bg-accent"
              >
                Geist
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
            <NumberFlowBadge
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
    </div>
  );
};

export default WritingSection;
