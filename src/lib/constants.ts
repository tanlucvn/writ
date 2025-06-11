import type { AppColor } from "@/store/use-app-settings-store";

export const SORT_OPTIONS_GROUPED = [
  {
    group: "Sort by Created",
    options: [
      { label: "Newest", value: "created-desc" },
      { label: "Oldest", value: "created-asc" },
    ],
  },
  {
    group: "Sort by Updated",
    options: [
      { label: "Newest", value: "updated-desc" },
      { label: "Oldest", value: "updated-asc" },
    ],
  },
  {
    group: "Sort by Title",
    options: [
      { label: "Title (A-Z)", value: "title-asc" },
      { label: "Title (Z-A)", value: "title-desc" },
    ],
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
  ];
