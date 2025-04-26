import { cn } from "@/lib/utils";

export default function Loading({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-background",
        className,
      )}
    >
      <span className="size-4 animate-ping rounded-full bg-foreground" />
    </div>
  );
}
