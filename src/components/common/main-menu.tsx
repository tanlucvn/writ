"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useAppSettingsStore } from "@/store/app-settings-store";
import { useAppStore } from "@/store/app-store";
import { useDialogStore } from "@/store/dialog-store";
import { useTabStore } from "@/store/tab-store";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import {
  ArrowDownRightIcon,
  ArrowUpRightIcon,
  BadgeInfoIcon,
  ChartPieIcon,
  CircleHelpIcon,
  GithubIcon,
  LeafIcon,
  LibraryBigIcon,
  MusicIcon,
  PenIcon,
  PlusIcon,
  ScrollTextIcon,
  SettingsIcon,
  ShieldIcon,
  UserIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import Logo from "../logo";
import { ThemeSwitcher } from "../theme";
import DashedContainer from "../ui/dashed-container";

type NavMenuLinkProps = {
  children: React.ReactNode;
  href: string;
  target?: React.HTMLAttributeAnchorTarget;
  icon?: React.ReactNode;
  rel?: string;
  className?: string;
};

interface TabProps {
  onClose?: () => void;
  onAction?: () => void;
}

export const NavMenuLink = ({
  children,
  href,
  target,
  icon,
  className,
}: NavMenuLinkProps) => (
  <Link href={href} target={target}>
    <Button
      variant="outline"
      className={cn(
        "flex w-full items-center justify-start px-2 py-0 text-muted-foreground text-xs",
        className,
      )}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </Button>
  </Link>
);

type NavMenuItemProps = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export const NavMenuItem = ({
  children,
  icon,
  className,
  onClick,
}: NavMenuItemProps) => (
  <Button
    variant="outline"
    className={cn(
      "flex w-full items-center justify-start px-2 py-0 text-muted-foreground text-xs",
      className,
    )}
    onClick={onClick}
  >
    {icon && <span className="mr-1">{icon}</span>}
    {children}
  </Button>
);

type NavMenuSectionProps = {
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
};

const NavMenuSection = ({ title, children, onClose }: NavMenuSectionProps) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center justify-between">
      <p className="px-1.5 py-1 font-mono text-muted-foreground text-xs">
        {title}
      </p>
      {onClose && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="size-8 text-muted-foreground hover:bg-transparent hover:text-foreground"
        >
          <XIcon />
        </Button>
      )}
    </div>

    {children}
  </div>
);

const WritesTab = ({ onClose, onAction }: TabProps) => {
  const { createNewWrite } = useAppStore();
  const { setWritesHistoryOpen } = useDialogStore();

  return (
    <NavMenuSection title="Writes" onClose={onClose}>
      <Button
        variant="outline"
        className="text-xs"
        onClick={() => {
          onClose?.();
          onAction?.();
          createNewWrite();
        }}
      >
        <PlusIcon />
        Create New
      </Button>

      <Button
        variant="outline"
        className="text-xs"
        onClick={() => {
          onClose?.();
          onAction?.();
          setWritesHistoryOpen(true);
        }}
      >
        <LibraryBigIcon />
        View History
      </Button>
    </NavMenuSection>
  );
};

const SessionsTab = ({ onClose }: { onClose: () => void }) => (
  <NavMenuSection title="Write Sessions" onClose={onClose}>
    <Button variant="outline" className="text-xs">
      <PlusIcon />
      Create New
    </Button>

    <Button variant="outline" className="text-xs">
      <LibraryBigIcon />
      View History
    </Button>
  </NavMenuSection>
);

const AccountsTab = ({ onClose }: { onClose: () => void }) => {
  const handleLogout = async () => {
    toast.success("Logged out successfully!");
    onClose();
  };

  return (
    <NavMenuSection title="Accounts" onClose={onClose}>
      <SignOutButton>
        <Button
          variant="outline"
          className="text-destructive text-xs"
          onClick={handleLogout}
        >
          <ArrowDownRightIcon />
          Log out
        </Button>
      </SignOutButton>
    </NavMenuSection>
  );
};

const MainMenu = (): React.ReactElement => {
  const { toggleZenMode, isZenMode } = useAppSettingsStore();
  const {
    setSettingsOpen,
    setMusicPlayerOpen,
    setIsHelpDialogOpen,
    setStatisticsOpen,
    setIsWriteSummaryOpen,
  } = useDialogStore();
  const { setTab } = useTabStore();
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<string>("home");
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          className="size-8 outline-2 outline-border outline-offset-2"
          size="icon"
          variant="secondary"
        >
          <Logo />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className={cn(
          "z-[1] w-[300px] bg-background p-1",
          isZenMode ? "mb-1" : "mt-1",
        )}
      >
        <DashedContainer className="p-2">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {activeTab === "writes" && (
              <WritesTab
                onClose={() => handleTabChange("home")}
                onAction={() => setIsOpen(false)}
              />
            )}
            {activeTab === "sessions" && (
              <SessionsTab onClose={() => handleTabChange("home")} />
            )}
            {activeTab === "accounts" && (
              <AccountsTab onClose={() => handleTabChange("home")} />
            )}
            {activeTab === "home" && (
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col space-y-2">
                  <p className="font-mono text-muted-foreground text-xs">
                    Explore
                  </p>
                  <div className="grid w-full grid-cols-2 gap-x-2 gap-y-2">
                    <NavMenuItem
                      icon={<PenIcon size={15} />}
                      onClick={() => handleTabChange("writes")}
                    >
                      Writes
                    </NavMenuItem>

                    <NavMenuItem
                      icon={<PenIcon size={15} />}
                      onClick={() => handleTabChange("sessions")}
                    >
                      Write Sessions
                    </NavMenuItem>

                    <NavMenuItem
                      icon={<MusicIcon size={15} />}
                      onClick={() => setMusicPlayerOpen(true)}
                    >
                      Music
                    </NavMenuItem>

                    <NavMenuItem
                      icon={<LeafIcon size={15} />}
                      onClick={toggleZenMode}
                    >
                      Zen Mode
                    </NavMenuItem>

                    <NavMenuItem
                      icon={<SettingsIcon size={15} />}
                      onClick={() => setSettingsOpen(true)}
                    >
                      Settings
                    </NavMenuItem>

                    <NavMenuItem
                      icon={<CircleHelpIcon size={15} />}
                      onClick={() => setIsHelpDialogOpen(true)}
                    >
                      Help
                    </NavMenuItem>

                    <NavMenuItem
                      icon={<ChartPieIcon size={15} />}
                      onClick={() => setStatisticsOpen(true)}
                    >
                      Statistics
                    </NavMenuItem>

                    <NavMenuItem
                      icon={<ScrollTextIcon size={15} />}
                      onClick={() => setIsWriteSummaryOpen(true)}
                    >
                      Write Summary
                    </NavMenuItem>
                  </div>
                </div>

                {isMobile && !user && (
                  <div className="flex flex-col space-y-2">
                    <p className="font-mono text-muted-foreground text-xs">
                      Accounts
                    </p>
                    <div className="grid w-full grid-cols-2 gap-x-2 gap-y-2">
                      <NavMenuItem
                        icon={<ArrowUpRightIcon size={15} />}
                        onClick={() => setTab("signin")}
                      >
                        Sign in
                      </NavMenuItem>
                    </div>
                  </div>
                )}
                {isMobile && user && (
                  <div className="flex flex-col space-y-2">
                    <p className="font-mono text-muted-foreground text-xs">
                      Accounts
                    </p>
                    <div className="grid w-full grid-cols-2 gap-x-2 gap-y-2">
                      <NavMenuItem
                        icon={<UserIcon size={15} />}
                        onClick={() => handleTabChange("accounts")}
                      >
                        My Account
                      </NavMenuItem>
                    </div>
                  </div>
                )}

                <div className="flex flex-col space-y-2">
                  <p className="font-mono text-muted-foreground text-xs">
                    Resources
                  </p>
                  <div className="grid w-full grid-cols-2 gap-x-2 gap-y-2">
                    <NavMenuLink
                      href="https://github.com/tanlucvn/miniwrit"
                      target="_blank"
                      rel="noopener noreferrer"
                      icon={<GithubIcon size={15} />}
                    >
                      Github
                    </NavMenuLink>

                    {isMobile && (
                      <NavMenuItem
                        icon={<BadgeInfoIcon size={15} />}
                        onClick={() => setTab("about")}
                      >
                        About
                      </NavMenuItem>
                    )}
                    {isMobile && (
                      <NavMenuItem
                        icon={<ShieldIcon size={15} />}
                        onClick={() => setTab("privacy")}
                      >
                        Privacy
                      </NavMenuItem>
                    )}
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          <div className="mt-4 flex items-center justify-between border-t pt-1">
            <p className="font-mono text-muted-foreground text-xs">
              Version: 0.1.0
            </p>
            <ThemeSwitcher />
          </div>
        </DashedContainer>
      </PopoverContent>
    </Popover>
  );
};

export default MainMenu;
