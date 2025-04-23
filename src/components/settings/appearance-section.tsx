import { ThemeSwitcher } from "@/components/theme";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function AppearanceSection() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <span className="text-muted-foreground text-sm">Label 1</span>
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="hide-favicons">Toggle 1</Label>
          <Switch id="hide-tabs-favicons" />
        </div>
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="hide-favicons">Toggle 2</Label>
          <Switch id="hide-bookmarks-favicons" />
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
