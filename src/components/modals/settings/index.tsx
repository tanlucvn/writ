"use client";
import {
  AppearanceSection,
  FeedbackSection,
  StorageSection,
  TagsSection,
  WritingSection,
} from "@/components/modals/settings/_components/index";
import { AnimatedTabs } from "@/components/motion";
import {} from "@/components/ui/command";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal";
import { useDialogStore } from "@/store/use-dialog-store";
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
import SyncSection from "./_components/sync-section";

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

const SettingsModal = () => {
  const { isSettingsOpen, setSettingsOpen } = useDialogStore();

  return (
    <Modal open={isSettingsOpen} onOpenChange={setSettingsOpen}>
      <ModalContent>
        <ModalHeader>
          <ModalDescription>Change your app settings.</ModalDescription>
          <ModalTitle>App Settings</ModalTitle>
        </ModalHeader>
        <AnimatedTabs tabs={settingsTabs} />
      </ModalContent>
    </Modal>
  );
};

export default SettingsModal;
