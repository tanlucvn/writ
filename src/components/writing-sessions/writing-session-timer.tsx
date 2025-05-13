const WritingSessionTimer = ({ timer }: { timer: number }) => {
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  const formatted = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  return (
    <div className="w-fit select-none rounded-md bg-secondary px-1 py-0.5 font-medium text-foreground-muted text-xs">
      {formatted}
    </div>
  );
};

export default WritingSessionTimer;
