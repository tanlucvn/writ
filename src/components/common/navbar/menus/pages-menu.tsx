import { Button } from "@/components/ui/button";
import DashedContainer from "@/components/ui/dashed-container";
import { Separator } from "@/components/ui/separator";
import { useAppStore } from "@/store/app-store";
import {
  ArrowUpRightIcon,
  GithubIcon,
  InfoIcon,
  LockIcon,
  XIcon,
} from "lucide-react";
import MenuItemButton from "../components/menu-item-button";
import MenuItemLinkButton from "../components/menu-item-link-button";

const PagesMenu = () => {
  const { setCurrentMenu, setAppTab } = useAppStore();

  return (
    <div className="z-10 mx-2 mb-1 rounded-2xl border bg-background p-1">
      <DashedContainer className="relative flex flex-col gap-2 rounded-xl p-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentMenu("menu")}
          className="absolute top-2 right-2 size-fit text-muted-foreground hover:bg-transparent hover:text-foreground"
        >
          <XIcon />
        </Button>
        <div className="space-y-2">
          <p className="select-none font-medium font-mono text-muted-foreground text-xs">
            Pages
          </p>
          <div className="flex flex-col items-center justify-center gap-2">
            <MenuItemButton
              icon={<ArrowUpRightIcon />}
              label="Sign In"
              onClick={() => setAppTab("signin")}
            />
            <MenuItemButton
              icon={<InfoIcon />}
              label="About"
              onClick={() => setAppTab("about")}
            />
            <MenuItemButton
              icon={<LockIcon />}
              label="Privacy"
              onClick={() => setAppTab("privacy")}
            />
            <Separator />
            <MenuItemLinkButton
              icon={<GithubIcon />}
              label="Github"
              href="https://github.com/tanlucvn/miniwrit"
            />
          </div>
        </div>
      </DashedContainer>
    </div>
  );
};

export default PagesMenu;
