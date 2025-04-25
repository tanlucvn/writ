import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getTagColors } from "@/lib/colors";
import { CircleIcon } from "lucide-react";

interface TagColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export default function TagColorPicker({
  color,
  onChange,
}: TagColorPickerProps) {
  const tagColors = getTagColors();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="outline" className="size-8">
          <CircleIcon fill={color} className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-2">
        <div className="grid w-full grid-cols-4 gap-1">
          {tagColors.map((c) => (
            <Button
              variant="outline"
              size="icon"
              key={c}
              onClick={() => onChange(c)}
              className="bg-transparent"
            >
              <CircleIcon fill={c} className="size-4" />
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
