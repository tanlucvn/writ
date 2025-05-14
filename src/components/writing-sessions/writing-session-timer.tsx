const WritingSessionTimer = ({ timer }: { timer: number }) => {
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  const formatted = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  return (
    <div className="w-12 select-none rounded-md bg-secondary px-1 py-0.5 font-medium text-foreground text-xs outline-double outline-1 outline-border outline-offset-2">
      {formatted}
    </div>
  );
};

export default WritingSessionTimer;
