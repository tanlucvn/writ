export interface Write {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tagIds?: string[];
  synced: number;
}
