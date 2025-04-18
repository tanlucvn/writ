export default function Header() {
  const now = new Date();
  const formattedDate = now.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return (
    <div className="fixed top-0 left-0 flex w-full flex-col p-4 px-2 text-xs opacity-70 backdrop-blur-sm transition-opacity duration-300 hover:opacity-100">
      <h1 className="font-semibold">Miniwrit</h1>
      <p className="text-foreground/70">{formattedDate}</p>
    </div>
  );
}
