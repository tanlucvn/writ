import type { AppColor } from "@/store/app-settings-store";
import type { WriteColor } from "@/types";

export const WRITE_SORT_OPTIONS_GROUPED = [
  {
    group: "Created",
    options: [
      { label: "Newest", value: "created-desc" },
      { label: "Oldest", value: "created-asc" },
    ],
  },
  {
    group: "Updated",
    options: [
      { label: "Newest", value: "updated-desc" },
      { label: "Oldest", value: "updated-asc" },
    ],
  },
  {
    group: "Title",
    options: [
      { label: "Title (A-Z)", value: "title-asc" },
      { label: "Title (Z-A)", value: "title-desc" },
    ],
  },
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

export const WRITE_COLORS = [
  {
    name: "default",
    text: "text-foreground",
    editorText: "text-foreground",
    bg: "bg-card",
    outline: "outline-border",
  },
  {
    name: "lavender",
    text: "text-lavender-foreground",
    editorText: "text-lavender",
    bg: "bg-lavender",
    outline: "outline-lavender",
  },
  {
    name: "peach",
    text: "text-peach-foreground",
    editorText: "text-peach",
    bg: "bg-peach",
    outline: "outline-peach",
  },
  {
    name: "mint",
    text: "text-mint-foreground",
    editorText: "text-mint",
    bg: "bg-mint",
    outline: "outline-mint",
  },
  {
    name: "silver",
    text: "text-silver-foreground",
    editorText: "text-silver",
    bg: "bg-silver",
    outline: "outline-silver",
  },
  {
    name: "blue",
    text: "text-blue-foreground",
    editorText: "text-blue",
    bg: "bg-blue",
    outline: "outline-blue",
  },
  {
    name: "cambridge",
    text: "text-cambridge-foreground",
    editorText: "text-cambridge",
    bg: "bg-cambridge",
    outline: "outline-cambridge",
  },
  {
    name: "melon",
    text: "text-melon-foreground",
    editorText: "text-melon",
    bg: "bg-melon",
    outline: "outline-melon",
  },
  {
    name: "mikado",
    text: "text-mikado-foreground",
    editorText: "text-mikado",
    bg: "bg-mikado",
    outline: "outline-mikado",
  },
  {
    name: "mindaro",
    text: "text-mindaro-foreground",
    editorText: "text-mindaro",
    bg: "bg-mindaro",
    outline: "outline-mindaro",
  },
  {
    name: "slate",
    text: "text-slate-foreground",
    editorText: "text-slate",
    bg: "bg-slate",
    outline: "outline-slate",
  },
  {
    name: "sunset",
    text: "text-sunset-foreground",
    editorText: "text-sunset",
    bg: "bg-sunset",
    outline: "outline-sunset",
  },
  {
    name: "tickle",
    text: "text-tickle-foreground",
    editorText: "text-tickle",
    bg: "bg-tickle",
    outline: "outline-tickle",
  },
  {
    name: "tiffany",
    text: "text-tiffany-foreground",
    editorText: "text-tiffany",
    bg: "bg-tiffany",
    outline: "outline-tiffany",
  },
  {
    name: "wisteria",
    text: "text-wisteria-foreground",
    editorText: "text-wisteria",
    bg: "bg-wisteria",
    outline: "outline-wisteria",
  },
];

export const EDITOR_COLOR_CLASSES = WRITE_COLORS.map((c) => ({
  name: c.name,
  text: c.text,
  editorText: c.editorText,
  background: c.bg,
}));

export const COLOR_CLASSES_MAP: Record<
  WriteColor,
  { bg: string; text: string; outline?: string }
> = Object.fromEntries(
  WRITE_COLORS.map((c) => [
    c.name,
    { bg: c.bg, text: c.text, outline: c.outline },
  ]),
) as Record<WriteColor, { bg: string; text: string; outline?: string }>;
