import HeroContent from "./content";
import HeroSidebar from "./sidebar";

export default function Hero() {
  return (
    <div className="relative flex justify-center rounded-xl border-2 border-border/60 bg-background outline-double outline-2 outline-border outline-offset-2">
      <div className="space-y-1">
        <div className="flex gap-2 border-b p-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-2 w-2 rounded-full bg-border" />
          ))}
        </div>

        <div className="relative flex h-[min(680px,90vh)] w-[min(1024px,90vw)] overflow-hidden">
          <HeroSidebar />
          <div className="flex-1 overflow-auto py-2">
            <HeroContent />
          </div>
        </div>
      </div>
    </div>
  );
}
