"use client";

import {} from "@/components/ui/drawer";
import { useAppStore } from "@/store/app-store";
import { useDialogStore } from "@/store/dialog-store";
import { useEffect, useState } from "react";
import {
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
} from "../ui/credenza";
import DashedContainer from "../ui/dashed-container";

const cleanText = (html: string) => {
  return html
    .replace(/<\/?[^>]+(>|$)/g, "") // Remove HTML tags
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim();
};

const SummaryItem = ({
  label,
  value,
}: { label: string; value: string | number }) => (
  <div className="flex flex-col gap-1 rounded-md border bg-secondary p-2 outline-double outline-1 outline-border outline-offset-2">
    <span className="text-muted-foreground text-sm">{label}</span>
    <span className="font-medium text-base text-foreground">{value}</span>
  </div>
);

const WriteSummary = () => {
  const { isWriteSummaryOpen, setIsWriteSummaryOpen } = useDialogStore();
  const { currentContent } = useAppStore();

  const [summary, setSummary] = useState({
    letters: 0,
    words: 0,
    paragraphs: 0,
    sentences: 0,
    readingTime: 0,
  });

  useEffect(() => {
    if (!currentContent?.id) return;

    const raw = currentContent.content || "";
    const text = cleanText(raw);

    const letters = text.length;
    const wordsArr = text.split(/\s+/).filter(Boolean);
    const paragraphs = text.split(/\n{2,}/).filter((p) => p.trim());
    const sentences = text.split(/[.!?]+/).filter(Boolean);
    const readingTime = Math.ceil(wordsArr.length / 200);

    setSummary({
      letters,
      words: wordsArr.length,
      paragraphs: paragraphs.length,
      sentences: sentences.length,
      readingTime,
    });
  }, [currentContent]);

  return (
    <Credenza open={isWriteSummaryOpen} onOpenChange={setIsWriteSummaryOpen}>
      <CredenzaContent className="mx-auto max-w-lg border bg-background p-1 shadow-none">
        <DashedContainer className="p-6">
          <CredenzaHeader className="p-0">
            <CredenzaDescription className="font-mono text-muted-foreground text-xs">
              Key insights about your current write.
            </CredenzaDescription>
            <CredenzaTitle className="font-medium text-foreground text-sm">
              Write Summary
            </CredenzaTitle>
          </CredenzaHeader>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <SummaryItem label="Letters" value={summary.letters} />
            <SummaryItem label="Words" value={summary.words} />
            <SummaryItem label="Paragraphs" value={summary.paragraphs} />
            <SummaryItem label="Sentences" value={summary.sentences} />
            <SummaryItem
              label="Reading Time"
              value={`${summary.readingTime} min`}
            />
          </div>
        </DashedContainer>
      </CredenzaContent>
    </Credenza>
  );
};

export default WriteSummary;
