import ThemeToggle from "@/components/theme-toggle";
import DateDisplay from "./date-display";

export default function Header() {
  return (
    <div className="fixed top-0 left-0 flex w-full items-center justify-between p-4 px-2 text-xs opacity-70 backdrop-blur-sm transition-opacity duration-300 hover:opacity-100">
      <DateDisplay />

      <ThemeToggle />
    </div>
  );
}
