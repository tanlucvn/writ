import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { WRITE_COLORS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface TagColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const TagColorPicker = ({ color, onChange }: TagColorPickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="outline" className="size-8 bg-transparent">
          <span
            className={cn(
              "size-6 rounded-sm",
              WRITE_COLORS.find((c) => c.name === color)?.bg,
            )}
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-2">
        <div className="grid w-full grid-cols-4 gap-1">
          {WRITE_COLORS.map(({ name, bg }) => (
            <Button
              key={name}
              variant="outline"
              size="icon"
              onClick={() => onChange(name)}
              className={cn(
                "size-8 bg-transparent",
                name === color && "ring-1 ring-ring",
              )}
            >
              <span className={cn("size-6 rounded-sm", bg)} />
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TagColorPicker;
