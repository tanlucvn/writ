export interface Session {
  id: string;
  noteId: string | null;
  duration: number;
  startingWordCount: number;
  endingWordCount: number;
}
