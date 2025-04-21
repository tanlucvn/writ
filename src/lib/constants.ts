export const WRITE_SORT_OPTIONS = [
  { label: "Last Updated (Newest)", value: "updated-desc" },
  { label: "Last Updated (Oldest)", value: "updated-asc" },
  { label: "Title (A-Z)", value: "title-asc" },
  { label: "Title (Z-A)", value: "title-desc" },
];

export enum EditorMarks {
  BOLD = "bold",
  ITALIC = "italic",
  UNDERLINE = "underline",
  LINK = "link",
  HIGHLIGHT = "highlight",
}

export enum EditorHeadings {
  NORMAL = "normal",
  H2 = "h2",
  H3 = "h3",
  H4 = "h4",
}

export enum EditorNodes {
  CODE = "codeBlock",
  QUOTE = "blockquote",
}
