export type GoalType = "wordCount" | "freeWrite";

export interface Session {
  id: string;
  noteId: string | null;
  duration: number;
  startingWordCount: number;
  endingWordCount: number;
  createdAt: string;
  updatedAt: string;

  goalType?: GoalType;
  goalValue?: number;
  label?: string; // Ex: "Journaling", "Morning"
}
