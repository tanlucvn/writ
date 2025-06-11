import type { Note } from "@/types";

export function parseImportedNotes(raw: string): Note[] {
  try {
    const parsed = JSON?.parse(raw);

    if (!Array.isArray(parsed)) {
      console.warn("Imported data is not an array");
      return [];
    }

    return parsed.filter((n): n is Note => {
      return (
        typeof n === "object" &&
        typeof n.id === "string" &&
        typeof n.title === "string" &&
        typeof n.content === "string" &&
        typeof n.createdAt === "string"
      );
    });
  } catch (err) {
    console.error("Failed to parse imported notes:", err);
    return [];
  }
}
