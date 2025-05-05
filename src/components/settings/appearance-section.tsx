import { ThemeSwitcher } from "@/components/theme";
import { Label } from "@/components/ui/label";
import { COLOR_OPTIONS } from "@/lib/constants";
import { type AppColor, useAppSettingsStore } from "@/store/app-settings-store";
import DashedContainer from "../ui/dashed-container";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const AppearanceSection = () => {
  const { appColor, setAppColor } = useAppSettingsStore();

  const selectedColor = COLOR_OPTIONS.find((opt) => opt.value === appColor);

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-2">
        <span className="font-mono text-muted-foreground text-xs">
          App color
        </span>
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="color-select">Color</Label>
          <Select
            value={appColor}
            onValueChange={(value) => setAppColor(value as AppColor)}
          >
            <SelectTrigger id="color-select" className="h-8 w-[180px] text-xs">
              <SelectValue placeholder="Select a color" />
            </SelectTrigger>
            <SelectContent className="mt-1">
              <DashedContainer className="p-1">
                {COLOR_OPTIONS.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="text-xs hover:bg-accent"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </DashedContainer>
            </SelectContent>
          </Select>
        </div>
        {selectedColor && (
          <p className="text-muted-foreground text-xs">{selectedColor.desc}</p>
        )}
      </div>
      <hr />
      <div className="flex flex-col space-y-2">
        <span className="font-mono text-muted-foreground text-xs">
          App theme
        </span>
        <div className="flex items-center justify-between">
          <Label htmlFor="theme">Theme</Label>
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
};

export default AppearanceSection;
