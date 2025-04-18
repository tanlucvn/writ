export default function DateDisplay() {
  const now = new Date();
  const formattedDate = now.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return (
    <div className="flex flex-col">
      <h1 className="font-semibold">Miniwrit</h1>
      <p className="text-foreground/70">{formattedDate}</p>
    </div>
  );
}
