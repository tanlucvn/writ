import { Button } from "@/components/ui/button";
import { CornerDownLeftIcon } from "lucide-react";

const MenuItemButton = ({
  icon,
  onClick,
  label,
}: {
  icon: React.ReactNode;
  onClick?: () => void;
  label: string;
}) => (
  <Button
    variant="ghost"
    size="sm"
    className="group relative w-full justify-start px-2 text-muted-foreground text-xs hover:bg-transparent hover:text-foreground"
    onClick={onClick}
  >
    <div className="flex size-8 items-center justify-center rounded-md border p-1 group-hover:bg-secondary">
      {icon}
    </div>
    <div className="absolute right-2 hidden group-hover:block">
      <CornerDownLeftIcon />
    </div>
    {label}
  </Button>
);

export default MenuItemButton;
