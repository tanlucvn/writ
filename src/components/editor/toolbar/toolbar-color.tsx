import DashedContainer from "@/components/ui/dashed-container";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Toggle } from "@/components/ui/toggle";
import { EDITOR_COLOR_CLASSES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/app-store";
import { CheckIcon } from "lucide-react";
import { useEffect, useState } from "react";

export const ToolbarColor = () => {
  const { editor } = useAppStore();
  const [color, setColor] = useState<string>("default");

  const handleSetColor = (newColor: string) => {
    if (!editor) return;

    if (newColor === "default") {
      editor.chain().focus().unsetColorClass().run();
    } else {
      editor.chain().focus().setColorClass(newColor).run();
    }

    setColor(newColor);
  };

  useEffect(() => {
    if (!editor) return;

    if (editor.isActive("textStyle")) {
      const colorClass = editor.getAttributes("textStyle").color;
      setColor(colorClass || "default");
    }
  }, [editor]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Toggle
          size="sm"
          aria-label="Color"
          className="md:rounded-none md:rounded-tr-lg md:rounded-br-lg"
        >
          <span
            className={cn(
              "flex size-5 items-center justify-center rounded px-2 py-0.5 text-sm ",
              color,
              {
                "text-white": color.startsWith("bg-"),
              },
            )}
          >
            A
          </span>
        </Toggle>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="max-h-[240px] overflow-y-auto p-1"
      >
        <DashedContainer className="p-2">
          <p className="px-1.5 py-1 font-mono text-muted-foreground text-xs">
            Text
          </p>
          {EDITOR_COLOR_CLASSES.map((c: any) => (
            <DropdownMenuItem
              key={c.name}
              onClick={() => handleSetColor(c.color)}
            >
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "flex h-5 w-5 items-center justify-center rounded text-dark",
                      c.color,
                    )}
                  >
                    A
                  </div>
                  <small className="capitalize">{c.name}</small>
                </div>
                {color === c.color && (
                  <CheckIcon className="h-4 w-4 opacity-70" />
                )}
              </div>
            </DropdownMenuItem>
          ))}

          <DropdownMenuSeparator />

          <p className="px-1.5 py-1 font-mono text-muted-foreground text-xs">
            Background
          </p>
          {EDITOR_COLOR_CLASSES.map((c: any) => (
            <DropdownMenuItem
              key={`${c.name}-bg`}
              onClick={() => handleSetColor(c.background)}
            >
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2 px-2">
                  <div
                    className={cn(
                      "flex h-5 w-5 items-center justify-center rounded text-white",
                      c.background,
                    )}
                  >
                    A
                  </div>
                  <small className="capitalize">{c.name}</small>
                </div>
                {color === c.background && (
                  <CheckIcon className="h-4 w-4 opacity-70" />
                )}
              </div>
            </DropdownMenuItem>
          ))}
        </DashedContainer>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
