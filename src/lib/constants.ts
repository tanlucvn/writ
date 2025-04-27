export const WRITE_SORT_OPTIONS = [
  { label: "Newest", value: "updated-desc" },
  { label: "Oldest", value: "updated-asc" },
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

export const musicStations = [
  {
    label: "Meditation",
    url: "https://www.youtube.com/watch?v=FjHGZj2IjBk",
  },
  {
    label: "In The Green",
    url: "https://www.youtube.com/watch?v=2PudHraDfis",
  },
  {
    label: "Break Time",
    url: "https://www.youtube.com/watch?v=m8PILb6pHqw",
  },
  {
    label: "Study Night",
    url: "https://www.youtube.com/watch?v=yiRyARPDSPA",
  },
];
