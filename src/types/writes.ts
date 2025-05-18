export type WriteColor =
  | "default"
  | "blue"
  | "cambridge"
  | "melon"
  | "mikado"
  | "mindaro"
  | "slate"
  | "sunset"
  | "tickle"
  | "tiffany"
  | "wisteria";

export interface Write {
  id: string;
  title: string;
  content: string;
  pinned?: boolean;
  archived?: boolean;
  color?: WriteColor;
  tagIds?: string[];
  createdAt: string;
  updatedAt: string;
  removedAt?: string | null;
  syncedAt?: string | null;
  synced: number;
}
