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
  { name: "default", color: "default", background: "default" },
  {
    name: "stone",
    color: "text-stone-700 dark:text-stone-300",
    background: "bg-stone-400 dark:bg-stone-500",
  },
  {
    name: "red",
    color: "text-red-600 dark:text-red-500",
    background: "bg-red-400 dark:bg-red-500",
  },
  {
    name: "orange",
    color: "text-orange-600 dark:text-orange-500",
    background: "bg-orange-400 dark:bg-orange-500",
  },
  {
    name: "amber",
    color: "text-amber-600 dark:text-amber-500",
    background: "bg-amber-400 dark:bg-amber-500",
  },
  {
    name: "yellow",
    color: "text-yellow-600 dark:text-yellow-500",
    background: "bg-yellow-400 dark:bg-yellow-500",
  },
  {
    name: "lime",
    color: "text-lime-600 dark:text-lime-500",
    background: "bg-lime-400 dark:bg-lime-500",
  },
  {
    name: "green",
    color: "text-green-600 dark:text-green-500",
    background: "bg-green-400 dark:bg-green-500",
  },
  {
    name: "emerald",
    color: "text-emerald-600 dark:text-emerald-500",
    background: "bg-emerald-400 dark:bg-emerald-500",
  },
  {
    name: "teal",
    color: "text-teal-600 dark:text-teal-500",
    background: "bg-teal-400 dark:bg-teal-500",
  },
  {
    name: "cyan",
    color: "text-cyan-600 dark:text-cyan-500",
    background: "bg-cyan-400 dark:bg-cyan-500",
  },
  {
    name: "sky",
    color: "text-sky-600 dark:text-sky-500",
    background: "bg-sky-400 dark:bg-sky-500",
  },
  {
    name: "blue",
    color: "text-blue-600 dark:text-blue-500",
    background: "bg-blue-400 dark:bg-blue-500",
  },
  {
    name: "indigo",
    color: "text-indigo-600 dark:text-indigo-500",
    background: "bg-indigo-400 dark:bg-indigo-500",
  },
  {
    name: "violet",
    color: "text-violet-600 dark:text-violet-500",
    background: "bg-violet-400 dark:bg-violet-500",
  },
  {
    name: "purple",
    color: "text-purple-600 dark:text-purple-500",
    background: "bg-purple-400 dark:bg-purple-500",
  },
  {
    name: "fuchsia",
    color: "text-fuchsia-600 dark:text-fuchsia-500",
    background: "bg-fuchsia-400 dark:bg-fuchsia-500",
  },
  {
    name: "pink",
    color: "text-pink-600 dark:text-pink-500",
    background: "bg-pink-400 dark:bg-pink-500",
  },
  {
    name: "rose",
    color: "text-rose-600 dark:text-rose-500",
    background: "bg-rose-400 dark:bg-rose-500",
  },
];
