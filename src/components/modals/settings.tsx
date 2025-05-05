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
import type { TabOption } from "@/types";
import {
  ArchiveIcon,
  BlendIcon,
  CloudIcon,
  MessageSquareIcon,
  PenIcon,
  TagIcon,
} from "lucide-react";
import { useRef, useState } from "react";
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

type SettingTab = (typeof settingsTabs)[number]["label"];

const Settings = () => {
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
      <CredenzaContent className="w-full max-w-xl p-1 transition-all duration-0 max-md:max-w-none">
        <DashedContainer className="p-2">
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
              <div className="grid h-full grid-cols-[150px_auto] grid-rows-[1fr_30px] gap-2">
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
                  className="col-start-2 row-span-2 row-start-1 h-full max-h-[375px] flex-1 overflow-auto border-l"
                  ref={contentRef}
                >
                  <div className="size-full pt-2 pr-4 pl-4">
                    {settingsTabs.find((tab) => tab.label === page)?.content}
                  </div>
                </ScrollArea>
              </div>
            </Command>
          ) : (
            <AnimatedTabs tabs={settingsTabs} />
          )}
        </DashedContainer>
      </CredenzaContent>
    </Credenza>
  );
};

export default Settings;
