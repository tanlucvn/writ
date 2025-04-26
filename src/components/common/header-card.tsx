import { MainMenu } from "./main-menu";

export function HeaderCard() {
  return (
    <div className="flex w-full flex-col items-center justify-center space-y-4 border-b pb-10">
      <MainMenu />

      <div className="flex flex-col items-center justify-center space-y-1">
        <h1 className="font-bold text-xs">miniwrit</h1>
        <p className="text-muted-foreground text-xs">
          A clean, minimal app to write thoughts.
        </p>
      </div>
    </div>
  );
}
