export interface Write {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  fontFamily?: string;
  fontSize?: number;
  tagIds?: string[];
  synced: number;
}
