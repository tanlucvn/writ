"use client";

import { IconRenderer } from "@/components/icon-renderer";
import {
  AppearanceSection,
  FeedbackSection,
  StorageSection,
  SyncSection,
  TagsSection,
  WritingSection,
} from "@/components/modals/settings/_components/index";
import { AnimatedTabs } from "@/components/motion";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal";
import { useDialogStore } from "@/store/use-dialog-store";
import type { TabOption } from "@/types";

const settingsTabs: TabOption[] = [
  {
    label: "Appearance",
    icon: <IconRenderer name="Blend" />,
    content: <AppearanceSection />,
  },
  {
    label: "Tags",
    icon: <IconRenderer name="Tag" />,
    content: <TagsSection />,
  },
  {
    label: "Writing",
    icon: <IconRenderer name="Pen" />,
    content: <WritingSection />,
  },
  {
    label: "Feedback",
    icon: <IconRenderer name="MessageSquare" />,
    content: <FeedbackSection />,
  },
  {
    label: "Backup & Sync",
    icon: <IconRenderer name="Cloud" />,
    content: <SyncSection />,
  },
  {
    label: "Storage",
    icon: <IconRenderer name="Archive" />,
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
