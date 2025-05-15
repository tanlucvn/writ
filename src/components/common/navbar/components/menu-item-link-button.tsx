import { Button } from "@/components/ui/button";
import { CornerDownLeftIcon } from "lucide-react";
import Link from "next/link";

interface MenuItemLinkButtonProps {
  icon: React.ReactNode;
  href: string;
  label: string;
}

const MenuItemLinkButton = ({ icon, href, label }: MenuItemLinkButtonProps) => (
  <Button
    asChild
    variant="ghost"
    size="sm"
    className="group relative w-full justify-start px-2 text-muted-foreground text-xs hover:bg-transparent hover:text-foreground"
  >
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <div className="rounded-md border p-1 outline-double outline-1 outline-border outline-offset-2 group-hover:bg-secondary">
        {icon}
      </div>
      <div className="absolute right-2 hidden group-hover:block">
        <CornerDownLeftIcon />
      </div>
      {label}
    </Link>
  </Button>
);

export default MenuItemLinkButton;
