import Logo from "@/components/logo";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Heading({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex flex-col items-center gap-6 text-center", className)}
    >
      <div className="flex flex-col items-center gap-3 text-muted-foreground text-sm">
        <Button className="size-20 rounded-2xl outline-double outline-2 outline-primary outline-offset-2">
          <Logo className="size-12" />
        </Button>

        <h1 className="font-bold font-mono text-foreground tracking-wide">
          Miniwrit
        </h1>
      </div>
      <h1 className="max-w-3xl font-serif text-4xl tracking-tight md:text-5xl">
        A clean space to write your thoughts.
      </h1>
      <p className="max-w-xl text-pretty text-base text-muted-foreground md:text-lg">
        Minimal app for writing notes, thoughts, and ideas — no distractions,
        just writing.
      </p>
      <div className="mt-4 flex gap-3">
        <Button size="lg" className="px-6" asChild>
          <Link href="/app">Start Writing</Link>
        </Button>

        <Button variant="outline" size="lg" className="px-6" asChild>
          <Link
            href="https://github.com/tanlucvn/miniwrit"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </Link>
        </Button>
      </div>
    </div>
  );
}
