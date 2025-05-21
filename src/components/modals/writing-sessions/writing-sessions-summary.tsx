import {
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
} from "@/components/ui/credenza";
import { cleanText } from "@/lib/utils";
import {
  countCharacters,
  countParagraphs,
  countSentences,
  countWords,
} from "@/lib/word-count";
import { useDialogStore } from "@/store/dialog-store";
import { useWritesStore } from "@/store/writes-store";
import { useWritingSessionsStore } from "@/store/writing-sessions-store";
import { useEffect, useState } from "react";

const SummaryItem = ({
  label,
  value,
}: { label: string; value: string | number }) => (
  <div className="flex flex-col gap-1 rounded-md border bg-secondary p-2 outline-double outline-1 outline-border outline-offset-2">
    <span className="text-muted-foreground text-sm">{label}</span>
    <span className="font-medium text-base text-foreground">{value}</span>
  </div>
);

const WritingSessionsSummary = () => {
  const { currentWrite } = useWritesStore();
  const { currentSession } = useWritingSessionsStore();
  const { isWritingSessionSummaryOpen, setIsWritingSessionSummaryOpen } =
    useDialogStore();

  const [summary, setSummary] = useState({
    letters: 0,
    words: 0,
    paragraphs: 0,
    sentences: 0,
    readingTime: 0,
  });

  useEffect(() => {
    if (!currentSession || !currentWrite) return;

    const text = cleanText(currentWrite.content || "");

    const letters = countCharacters(text);
    const words = countWords(text);
    const paragraphs = countParagraphs(text);
    const sentences = countSentences(text);
    const readingTime = Math.ceil(words / 200);

    setSummary({
      letters,
      words,
      paragraphs,
      sentences,
      readingTime,
    });
  }, [currentSession, currentWrite]);

  if (!currentSession) return null;

  const duration = currentSession.duration;
  const wordsWritten =
    currentSession.endingWordCount - currentSession.startingWordCount;

  return (
    <Credenza
      open={isWritingSessionSummaryOpen}
      onOpenChange={setIsWritingSessionSummaryOpen}
    >
      <CredenzaContent className="mx-auto max-w-lg border bg-background p-1 shadow-none">
        <CredenzaHeader>
          <CredenzaDescription>
            Here's how your session went.
          </CredenzaDescription>
          <CredenzaTitle>Writing Session Summary</CredenzaTitle>
        </CredenzaHeader>

        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <SummaryItem label="Duration" value={`${duration} min`} />
          <SummaryItem label="Words Written" value={wordsWritten} />
          <SummaryItem label="Total Words" value={summary.words} />
          <SummaryItem label="Total Characters" value={summary.letters} />
          <SummaryItem label="Sentences" value={summary.sentences} />
          <SummaryItem label="Paragraphs" value={summary.paragraphs} />
          <SummaryItem
            label="Reading Time"
            value={`${summary.readingTime} min`}
          />
        </div>
      </CredenzaContent>
    </Credenza>
  );
};

export default WritingSessionsSummary;
