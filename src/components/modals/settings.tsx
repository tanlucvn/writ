"use client";
import { AnimatedTabs } from "@/components/motion";
import {
  AppearanceSection,
  FeedbackSection,
  StorageSection,
  TagsSection,
  WritingSection,
} from "@/components/settings";
import {} from "@/components/ui/command";
import {
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
} from "@/components/ui/credenza";
import { useDialogStore } from "@/store/dialog-store";
import type { TabOption } from "@/types";
import {
  ArchiveIcon,
  BlendIcon,
  CloudIcon,
  MessageSquareIcon,
  PenIcon,
  TagIcon,
} from "lucide-react";
import {} from "react";
import SyncSection from "../settings/sync-section";

const settingsTabs: TabOption[] = [
  {
    label: "Appearance",
    icon: <BlendIcon className="size-4" />,
    content: <AppearanceSection />,
  },
  {
    label: "Tags",
    icon: <TagIcon className="size-4" />,
    content: <TagsSection />,
  },
  {
    label: "Writing",
    icon: <PenIcon className="size-4" />,
    content: <WritingSection />,
  },
  {
    label: "Feedback",
    icon: <MessageSquareIcon className="size-4" />,
    content: <FeedbackSection />,
  },
  {
    label: "Backup & Sync",
    icon: <CloudIcon className="size-4" />,
    content: <SyncSection />,
  },
  {
    label: "Storage",
    icon: <ArchiveIcon className="size-4" />,
    content: <StorageSection />,
  },
] as const;

const Settings = () => {
  const { isSettingsOpen, setSettingsOpen } = useDialogStore();

  return (
    <Credenza open={isSettingsOpen} onOpenChange={setSettingsOpen}>
      <CredenzaContent className="w-full max-w-xl p-1 transition-all duration-0 max-md:max-w-none">
        <CredenzaHeader>
          <CredenzaDescription>Change your app settings.</CredenzaDescription>
          <CredenzaTitle>App Settings</CredenzaTitle>
        </CredenzaHeader>
        <AnimatedTabs tabs={settingsTabs} />
      </CredenzaContent>
    </Credenza>
  );
};

export default Settings;
