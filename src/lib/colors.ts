import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";

export function getTagColors() {
  const twConfig = resolveConfig(tailwindConfig);
  const themeColors = twConfig.theme?.colors || {};

  return Object.entries(themeColors)
    .filter(
      ([name, value]) =>
        typeof value !== "string" &&
        !["stone", "zinc", "gray", "rose", "sky", "purple"].includes(name),
    )
    .map(([_, colorObj]) => (colorObj as Record<string, string>)["500"])
    .filter(Boolean);
}
