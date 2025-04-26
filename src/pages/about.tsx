export default function AboutPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-20 text-center">
      <h1 className="mb-4 font-semibold text-2xl">About Miniwrit</h1>
      <p className="text-muted-foreground text-sm leading-relaxed">
        Miniwrit is a clean and minimal space to capture your thoughts, write
        freely, and focus on what truly matters — your words.
      </p>

      <div className="mt-8 text-muted-foreground text-xs">
        <p>Version 0.1.0</p>
        <p className="mt-1">
          Built by <span className="font-medium text-foreground">tanlucvn</span>
        </p>
      </div>
    </div>
  );
}
