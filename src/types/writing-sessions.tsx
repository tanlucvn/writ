export interface WritingSessions {
  id: string;
  writeId: string | null;
  duration: number;
  startingWordCount: number;
  endingWordCount: number;
}
