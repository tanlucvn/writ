"use client";
import { AnimatedTabs } from "@/components/motion";
import {
  AppearanceSection,
  FeedbackSection,
  StorageSection,
  SyncSection,
  TagsSection,
  WritingSection,
} from "@/components/settings";
import {} from "@/components/ui/command";
import {
  Credenza,
  CredenzaContent,
  CredenzaDescription,
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
import DashedContainer from "../ui/dashed-container";

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
      <CredenzaTitle className="sr-only">Settings</CredenzaTitle>
      <CredenzaDescription className="sr-only">
        Change your app settings.
      </CredenzaDescription>
      <CredenzaContent className="w-full max-w-xl p-1 transition-all duration-0 max-md:max-w-none">
        <DashedContainer className="p-2">
          <AnimatedTabs tabs={settingsTabs} />
        </DashedContainer>
      </CredenzaContent>
    </Credenza>
  );
};

export default Settings;
