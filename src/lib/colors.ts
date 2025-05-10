import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";

// Định nghĩa một kiểu cho các màu cụ thể mà bạn sử dụng
type ThemeColors = {
  black: string;
  midnight: string;
  night: string;
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
  const themeColors = twConfig.theme?.colors as ThemeColors;

  const customColors: (keyof ThemeColors)[] = [
    "black",
    "midnight",
    "night",
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
    .filter(Boolean);
}
