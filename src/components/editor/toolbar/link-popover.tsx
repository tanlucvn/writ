import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LinkIcon, UnlinkIcon } from "lucide-react";
import { useCallback, useState } from "react";

interface ToolbarLinkPopoverProps {
  editor: any;
}

export default function LinkPopover({ editor }: ToolbarLinkPopoverProps) {
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpenChange = useCallback(
    (next: boolean) => {
      setOpen(next);
      if (next) {
        const previousUrl = editor?.getAttributes("link")?.href || "";
        setUrl(previousUrl);
      }
    },
    [editor],
  );

  const setLink = () => {
    if (url) {
      editor?.chain().focus().setLink({ href: url }).run();
    } else {
      editor?.chain().focus().unsetLink().run();
    }
    setOpen(false);
  };

  const removeLink = () => {
    editor?.chain().focus().unsetLink().run();
    setUrl("");
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button
              variant={editor?.isActive("link") ? "default" : "outline"}
              size="sm"
              className="size-8 p-0"
            >
              <LinkIcon className="!size-3.5" />
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent side="top" align="center">
          {editor?.isActive("link") ? "Edit link" : "Add link"}
        </TooltipContent>
      </Tooltip>

      <PopoverContent className="space-y-2 rounded-lg" align="center">
        <Input
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="text-sm"
        />
        <div className="flex items-center justify-between">
          {editor?.isActive("link") && (
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={removeLink}
              className="gap-1.5 text-muted-foreground"
            >
              <UnlinkIcon className="h-3.5 w-3.5" />
              Unlink
            </Button>
          )}
          <Button size="sm" onClick={setLink}>
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
