"use client";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaTitle,
} from "@/components/ui/credenza";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { useDialogStore } from "@/store/dialog-store";
import {
  ArchiveIcon,
  BlendIcon,
  CloudIcon,
  MessageSquareIcon,
  PenIcon,
  TagIcon,
} from "lucide-react";
import { useRef, useState } from "react";
import Tabs, { type TabOption } from "../motion/animated-tabs";
import AppearanceSection from "../settings/appearance-section";
import FeedbackSection from "../settings/feedback-section";
import StorageSection from "../settings/storage-section";
import SyncSection from "../settings/sync-section";
import TagsSection from "../settings/tags-section";
import WritingSection from "../settings/writing-section";

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

type SettingTab = (typeof settingsTabs)[number]["label"];

export default function Settings() {
  const { isSettingsOpen, setSettingsOpen } = useDialogStore();
  const [page, setPage] = useState<SettingTab>("Appearance");
  const isMobile = useIsMobile();

  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <Credenza open={isSettingsOpen} onOpenChange={setSettingsOpen}>
      <CredenzaTitle className="sr-only">Settings</CredenzaTitle>
      <CredenzaDescription className="sr-only">
        Change your app settings.
      </CredenzaDescription>
      <CredenzaContent className="!rounded-2xl p-1">
        <div className="h-full w-full rounded-xl border-2 border-border border-dashed p-1">
          {!isMobile ? (
            <Command
              loop
              value={page}
              onValueChange={(p) => setPage(p as SettingTab)}
              className="min-h-[450px] bg-background"
            >
              <div className="mb-4 w-full">
                <CommandInput
                  placeholder="Search settings..."
                  autoFocus
                  className="w-full"
                />
              </div>
              <div className="grid h-full grid-cols-[150px_auto] grid-rows-[1fr_30px] gap-4">
                <CommandList>
                  <CommandGroup>
                    {settingsTabs.map((tab) => (
                      <CommandItem
                        key={tab.label}
                        className="flex items-center justify-start gap-2 rounded-tr-lg rounded-br-lg text-muted-foreground data-[selected=true]:text-foreground"
                      >
                        {tab.icon}
                        {tab.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                  <CommandEmpty className="p-2 text-xs">
                    No results.
                  </CommandEmpty>
                </CommandList>
                <ScrollArea
                  className="col-start-2 row-span-2 row-start-1 h-full max-h-[375px] flex-1 overflow-auto border-l pt-2 pr-2 pl-4"
                  ref={contentRef}
                >
                  {settingsTabs.find((tab) => tab.label === page)?.content}
                </ScrollArea>
              </div>
            </Command>
          ) : (
            <Tabs tabs={settingsTabs} />
          )}
        </div>
      </CredenzaContent>
    </Credenza>
  );
}
