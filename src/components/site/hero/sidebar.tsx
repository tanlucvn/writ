import { IconRenderer } from "@/components/icon-renderer";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function HeroSidebar() {
  return (
    <div className="hidden h-full w-[280px] select-none p-2 md:block">
      <div className="size-full space-y-4 rounded-lg border border-sidebar-border bg-sidebar p-2 shadow-sm">
        <div className="flex items-center gap-2 rounded-md p-2 hover:bg-muted">
          <Button size="icon" className="cursor-default">
            <Logo className="size-4" />
          </Button>

          <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5 leading-none">
            <span className="font-medium text-xs">Miniwrit</span>
            <span className="text-muted-foreground text-xs">Version 1.0.0</span>
          </div>
        </div>

        <div className="space-y-2">
          <Button
            variant="ghost"
            className="h-7 w-full cursor-default justify-start text-xs"
          >
            <IconRenderer name="Settings" />
            Settings
          </Button>
          <Button
            variant="ghost"
            className="h-7 w-full cursor-default justify-start text-xs"
          >
            <IconRenderer name="ChartPie" />
            Statistics
          </Button>
          <Button
            variant="ghost"
            className="h-7 w-full cursor-default justify-start text-xs"
          >
            <IconRenderer name="Keyboard" />
            Keyboard Shortcuts
          </Button>

          <Separator />

          <span className="flex h-6 w-fit items-center rounded-md bg-sidebar-primary p-2 font-medium text-sidebar-primary-foreground text-xs">
            Notes
          </span>
          <Button
            variant="ghost"
            className="h-7 w-full cursor-default justify-start text-xs"
          >
            <IconRenderer name="Plus" />
            Quick Create
          </Button>
          <Button
            variant="ghost"
            className="h-7 w-full cursor-default justify-start text-xs"
          >
            <IconRenderer name="LibraryBig" />
            All Notes
          </Button>
          <Button
            variant="ghost"
            className="!text-destructive h-7 w-full cursor-default justify-start text-xs"
          >
            <IconRenderer name="Trash" />
            Trash
          </Button>
          <span className="flex h-6 w-fit items-center rounded-md p-2 font-medium text-muted-foreground text-xs hover:bg-sidebar-accent">
            Sessions
          </span>
          <span className="flex h-6 w-fit items-center rounded-md p-2 font-medium text-muted-foreground text-xs hover:bg-sidebar-accent">
            Pages
          </span>
        </div>
      </div>
    </div>
  );
}
