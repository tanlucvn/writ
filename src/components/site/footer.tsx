import { ThemeSwitcher } from "../theme";

export default function Footer() {
  return (
    <footer className="flex w-full max-w-5xl flex-col justify-between gap-4 text-muted-foreground text-sm md:flex-row">
      <div>
        © {new Date().getFullYear()} <span>Miniwrit</span>. All rights reserved
      </div>
      <ThemeSwitcher />
    </footer>
  );
}
