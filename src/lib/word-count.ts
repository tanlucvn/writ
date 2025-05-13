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
