export interface Note {
  id: string;
  title: string;
  content: string;
  isPinned?: boolean;
  inTrash: boolean;

  parentId: string;
  tagIds?: string[];

  createdAt: string;
  updatedAt: string;
  syncedAt: string | null;
  synced: number;
}
