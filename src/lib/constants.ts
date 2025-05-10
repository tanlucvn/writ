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
  ];

export const EDITOR_COLOR_CLASSES = [
  { name: "default", color: "text-default", background: "bg-default" },
  {
    name: "lavender",
    color: "text-lavender",
    background: "bg-lavender",
  },
  {
    name: "peach",
    color: "text-peach",
    background: "bg-peach",
  },
  {
    name: "mint",
    color: "text-mint",
    background: "bg-mint",
  },
  {
    name: "silver",
    color: "text-silver",
    background: "bg-silver",
  },
  {
    name: "tiffany",
    color: "text-tiffany",
    background: "bg-tiffany",
  },
  {
    name: "cambridge",
    color: "text-cambridge",
    background: "bg-cambridge",
  },
  {
    name: "blue",
    color: "text-blue",
    background: "bg-blue",
  },
  {
    name: "mindaro",
    color: "text-mindaro",
    background: "bg-mindaro",
  },
  {
    name: "mikado",
    color: "text-mikado",
    background: "bg-mikado",
  },
  {
    name: "sunset",
    color: "text-sunset",
    background: "bg-sunset",
  },
  {
    name: "melon",
    color: "text-melon",
    background: "bg-melon",
  },
  {
    name: "tickle",
    color: "text-tickle",
    background: "bg-tickle",
  },
  {
    name: "wisteria",
    color: "text-wisteria",
    background: "bg-wisteria",
  },
  {
    name: "slate",
    color: "text-slate",
    background: "bg-slate",
  },
];
