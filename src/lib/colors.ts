import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";

type ThemeColors = {
  lavender: string;
  peach: string;
  mint: string;
  silver: string;
  tiffany: string;
  cambridge: string;
  blue: string;
  mindaro: string;
  mikado: string;
  sunset: string;
  melon: string;
  tickle: string;
  wisteria: string;
  slate: string;
};

export function getTagColors() {
  const twConfig = resolveConfig(tailwindConfig);
  const themeColors = twConfig.theme?.colors ?? {};

  const customColors: (keyof ThemeColors)[] = [
    "lavender",
    "peach",
    "mint",
    "silver",
    "tiffany",
    "cambridge",
    "blue",
    "mindaro",
    "mikado",
    "sunset",
    "melon",
    "tickle",
    "wisteria",
    "slate",
  ];

  return customColors
    .map((colorName) => themeColors[colorName])
    .filter(Boolean) as string[];
}
