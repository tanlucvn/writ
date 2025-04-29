import type { AppColor } from "@/store/app-settings-store";

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

export const COLOR_OPTIONS: { label: string; value: AppColor; desc: string }[] =
  [
    {
      label: "Default",
      value: "default",
      desc: "A balanced light/dark theme using neutral grays, ideal for clarity and minimalism.",
    },
    {
      label: "Beige",
      value: "beige",
      desc: "Warm, paper-like tones offering a cozy and soft aesthetic.",
    },
    {
      label: "Olive",
      value: "olive",
      desc: "A gentle olive green palette for a nature-inspired, calming feel.",
    },
    {
      label: "Ash",
      value: "ash",
      desc: "Cool gray tones evoking minimalism, stability, and modernity.",
    },
    {
      label: "Fog",
      value: "fog",
      desc: "Soft, misty grays designed to reduce glare and support focus.",
    },
    {
      label: "Mono",
      value: "mono",
      desc: "Pure black and white for strong contrast and a bold, editorial style.",
    },
  ];
