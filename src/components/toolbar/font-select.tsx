"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToolbarStore } from "@/store/toolbar-store";

export default function ToolbarFontSelect() {
  const { fontFamily, setFontFamily } = useToolbarStore();

  return (
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
  );
}
