import tailwindcssTypography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import { fontFamily } from "tailwindcss/defaultTheme";

const customColors = [
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
  "lavender",
];

export default {
  darkMode: ["class"],
  content: [
    "./src/views/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    ...customColors.flatMap((color) => [
      `bg-${color}`,
      `bg-${color}-foreground`,
      `text-${color}`,
      `text-${color}-foreground`,
      `border-${color}`,
      `border-${color}-foreground`,
      `outline-${color}`,
      `outline-${color}-foreground`,
      `ring-${color}`,
      `ring-${color}-foreground`,
      `stroke-${color}`,
      `fill-${color}`,
    ]),
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        /* CUSTOM */
        peach: {
          DEFAULT: "hsl(var(--peach))",
          foreground: "hsl(var(--peach-foreground))",
        },
        mint: {
          DEFAULT: "hsl(var(--mint))",
          foreground: "hsl(var(--mint-foreground))",
        },
        silver: {
          DEFAULT: "hsl(var(--silver))",
          foreground: "hsl(var(--silver-foreground))",
        },
        tiffany: {
          DEFAULT: "hsl(var(--tiffany))",
          foreground: "hsl(var(--tiffany-foreground))",
        },
        cambridge: {
          DEFAULT: "hsl(var(--cambridge))",
          foreground: "hsl(var(--cambridge-foreground))",
        },
        blue: {
          DEFAULT: "hsl(var(--blue))",
          foreground: "hsl(var(--blue-foreground))",
        },
        mindaro: {
          DEFAULT: "hsl(var(--mindaro))",
          foreground: "hsl(var(--mindaro-foreground))",
        },
        mikado: {
          DEFAULT: "hsl(var(--mikado))",
          foreground: "hsl(var(--mikado-foreground))",
        },
        sunset: {
          DEFAULT: "hsl(var(--sunset))",
          foreground: "hsl(var(--sunset-foreground))",
        },
        melon: {
          DEFAULT: "hsl(var(--melon))",
          foreground: "hsl(var(--melon-foreground))",
        },
        tickle: {
          DEFAULT: "hsl(var(--tickle))",
          foreground: "hsl(var(--tickle-foreground))",
        },
        wisteria: {
          DEFAULT: "hsl(var(--wisteria))",
          foreground: "hsl(var(--wisteria-foreground))",
        },
        slate: {
          DEFAULT: "hsl(var(--slate))",
          foreground: "hsl(var(--slate-foreground))",
        },
        lavender: {
          DEFAULT: "hsl(var(--lavender))",
          foreground: "hsl(var(--lavender-foreground))",
        },

        /* SHADCN */
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
        spacegrotesk: ["var(--font-spacegrotesk)", ...fontFamily.sans],
        dmsans: ["var(--font-dmsans)", ...fontFamily.sans],
        mono: ["var(--font-jetbrains-mono)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "spin-slow": "spin 2s linear infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate, tailwindcssTypography],
} satisfies Config;
