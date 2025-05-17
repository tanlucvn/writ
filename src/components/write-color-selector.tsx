import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WRITE_COLORS } from "@/lib/constants";
import { cn, getWriteColorClasses } from "@/lib/utils";
import type { WriteColor } from "@/types";

interface WriteColorSelectorProps {
  defaultColour: "default" | WriteColor;
  onValueChange: (value: "default" | WriteColor) => void;
  disabled?: boolean;
}

const WriteColorSelector = ({
  defaultColour,
  onValueChange,
  disabled,
}: WriteColorSelectorProps) => {
  return (
    <Select
      disabled={disabled}
      defaultValue={defaultColour}
      onValueChange={onValueChange}
    >
      <SelectTrigger className="capitalize">
        <SelectValue className="w-full" placeholder={defaultColour} />
      </SelectTrigger>
      <SelectContent
        side="bottom"
        align="center"
        className="flex h-60 flex-col gap-1 p-1"
      >
        {WRITE_COLORS.map((color) => (
          <SelectItem key={color.name} value={color.name}>
            <div className="flex w-full items-center gap-2">
              <span
                className={cn(
                  "size-4 rounded-sm border ",
                  getWriteColorClasses(color.name as WriteColor),
                )}
              />
              <span className="capitalize">{color.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default WriteColorSelector;
