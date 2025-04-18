import { Textarea } from "@/components/ui/textarea";

export default function TextEditor() {
  return (
    <div className="mx-auto w-full px-0 py-16">
      <Textarea
        className="scrollbar-hidden h-full w-full resize-none overflow-auto border-none bg-transparent px-2 leading-relaxed focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder="Start writing..."
      />
    </div>
  );
}
