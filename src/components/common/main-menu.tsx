"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import {} from "@/services/db/writes";
import { useAppSettingsStore } from "@/store/app-settings-store";
import { useAppStore } from "@/store/app-store";
import { useAuthStore } from "@/store/auth-store";
import { useDialogStore } from "@/store/dialog-store";
import { useTabStore } from "@/store/tab-store";
import { motion } from "framer-motion";
import {
  ArrowUpRightIcon,
  BadgeInfoIcon,
  ChartPieIcon,
  CircleHelpIcon,
  FocusIcon,
  GithubIcon,
  LibraryBigIcon,
  MusicIcon,
  PenIcon,
  PlusIcon,
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

type NavMenuLinkProps = {
  children: React.ReactNode;
  href: string;
  target?: React.HTMLAttributeAnchorTarget;
  icon?: React.ReactNode;
  rel?: string;
  className?: string;
};

export const NavMenuLink = ({
  children,
  href,
  target,
  icon,
  className,
}: NavMenuLinkProps) => (
  <Link href={href} target={target}>
    <Button
      variant="ghost"
      className={cn(
        "flex w-full items-center justify-start rounded-lg border px-2 py-0 text-muted-foreground text-xs outline-double outline-1 outline-border outline-offset-1 hover:bg-secondary",
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
    variant="ghost"
    className={cn(
      "flex items-center justify-start rounded-lg border px-2 py-0 text-muted-foreground text-xs outline-double outline-1 outline-border outline-offset-1 hover:bg-secondary",
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
  onBack?: () => void;
};

const NavMenuSection = ({ title, children, onBack }: NavMenuSectionProps) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center justify-between">
      <p className="px-1.5 py-1 font-mono text-muted-foreground text-xs">
        {title}
      </p>
      {onBack && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="size-8 text-muted-foreground hover:bg-transparent hover:text-foreground"
        >
          <XIcon />
        </Button>
      )}
    </div>

    {children}
  </div>
);

const WritesTab = ({ onBack }: { onBack: () => void }) => {
  const { createNewWrite } = useAppStore();
  const { setWritesHistoryOpen } = useDialogStore();

  return (
    <NavMenuSection title="Writes" onBack={onBack}>
      <Button
        variant="outline"
        className="rounded-lg text-xs outline-double outline-1 outline-border outline-offset-1 hover:bg-secondary"
        onClick={createNewWrite}
      >
        <PlusIcon />
        Create New
      </Button>

      <Button
        variant="outline"
        className="rounded-lg text-xs outline-double outline-1 outline-border outline-offset-1 hover:bg-secondary"
        onClick={() => setWritesHistoryOpen(true)}
      >
        <LibraryBigIcon />
        View History
      </Button>
    </NavMenuSection>
  );
};

const SessionsTab = ({ onBack }: { onBack: () => void }) => (
  <NavMenuSection title="Write Sessions" onBack={onBack}>
    <Button
      variant="outline"
      className="rounded-lg text-xs outline-double outline-1 outline-border outline-offset-1 hover:bg-secondary"
    >
      <PlusIcon />
      Create New
    </Button>

    <Button
      variant="outline"
      className="rounded-lg text-xs outline-double outline-1 outline-border outline-offset-1 hover:bg-secondary"
    >
      <LibraryBigIcon />
      View History
    </Button>
  </NavMenuSection>
);

const AccountsTab = ({ onBack }: { onBack: () => void }) => {
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();

    toast.success("Logged out successfully!");
    onBack();
  };

  return (
    <NavMenuSection title="Accounts" onBack={onBack}>
      <Button
        variant="outline"
        className="rounded-lg text-xs outline-double outline-1 outline-border outline-offset-1 hover:bg-secondary"
        onClick={handleLogout}
      >
        <ArrowUpRightIcon />
        Log out
      </Button>
    </NavMenuSection>
  );
};

const MainMenu = (): React.ReactElement => {
  const { toggleZenMode } = useAppSettingsStore();
  const {
    setSettingsOpen,
    setMusicPlayerOpen,
    setIsHelpDialogOpen,
    setStatisticsOpen,
  } = useDialogStore();
  const { setTab } = useTabStore();
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<string>("home");
  const isMobile = useIsMobile();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="size-8 outline-2 outline-border outline-offset-2"
          size="icon"
          variant="secondary"
        >
          <Logo />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="z-[1] mt-1 w-[300px] rounded-2xl bg-background p-1">
        <div className="h-full w-full rounded-xl border-2 border-border border-dashed p-2">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {activeTab === "writes" && (
              <WritesTab onBack={() => handleTabChange("home")} />
            )}
            {activeTab === "sessions" && (
              <SessionsTab onBack={() => handleTabChange("home")} />
            )}
            {activeTab === "accounts" && (
              <AccountsTab onBack={() => handleTabChange("home")} />
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
                      icon={<FocusIcon size={15} />}
                      onClick={toggleZenMode}
                    >
                      Focus Mode
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
                  </div>
                </div>

                {isMobile && !user && (
                  <div className="flex flex-col space-y-2">
                    <p className="font-mono text-muted-foreground text-xs">
                      Accounts
                    </p>
                    <div className="grid w-full grid-cols-2 gap-x-2 gap-y-2">
                      <NavMenuItem
                        icon={<UserIcon size={15} />}
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
        </div>
      </PopoverContent>
    </Popover>
  );
};

export { MainMenu };
