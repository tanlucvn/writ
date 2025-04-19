import { cn } from "@/lib/utils";

export default function Loading({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-screen w-screen items-center justify-center text-muted-foreground",
        className,
      )}
    >
      <span className="size-6 animate-ping rounded-full bg-foreground" />
    </div>
  );
}
