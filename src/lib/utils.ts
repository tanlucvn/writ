import type { Note } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { DateTime } from "luxon";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function safeCall<T>(
  fn: () => Promise<T>,
): Promise<T | undefined> {
  try {
    return await fn();
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export const sortWrites = (notes: Note[], option: string): Note[] => {
  return [...notes].sort((a, b) => {
    switch (option) {
      case "created-desc":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "created-asc":
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case "updated-desc":
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      case "updated-asc":
        return (
          new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
        );
      case "title-asc":
        return (a.title || "").localeCompare(b.title || "");
      case "title-desc":
        return (b.title || "").localeCompare(a.title || "");
      default:
        return 0;
    }
  });
};

export const cleanContent = (html: string) => {
  return html
    .replace(/<\/?[^>]+(>|$)/g, "") // Remove HTML tags
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim();
};

export function getRelativeTime(isoDate: string): string {
  const updated = DateTime.fromISO(isoDate);
  const diffInSeconds = DateTime.now().diff(updated, "seconds").seconds;

  return diffInSeconds < 60
    ? "just now"
    : (updated.toRelative({ locale: "en", round: true }) ?? "");
}

/* Word Count */
export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function countSentences(text: string): number {
  return text.split(/[.!?]+/).filter(Boolean).length;
}

export function countParagraphs(text: string): number {
  return text.split(/\n{2,}/).filter((p) => p.trim()).length;
}

export function countCharacters(text: string): number {
  return text.length;
}
