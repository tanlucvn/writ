import { ThemeSwitcher } from "@/components/theme";
import { Label } from "@/components/ui/label";
import { type AppColor, useAppSettingsStore } from "@/store/app-settings-store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function AppearanceSection() {
  const { appColor, setAppColor } = useAppSettingsStore();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <span className="text-muted-foreground text-sm">App color</span>
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="color-select">Color</Label>
          <Select
            value={appColor}
            onValueChange={(value) => setAppColor(value as AppColor)}
          >
            <SelectTrigger id="color-select" className="h-8 w-[180px] text-xs">
              <SelectValue placeholder="Select a color" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="beige">Beige</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <hr />
      <div className="flex flex-col gap-2 text-muted-foreground text-sm">
        <Label htmlFor="theme">Theme</Label>
        <ThemeSwitcher />
      </div>
    </div>
  );
}
