import * as FadeIn from "@/components/motion/fade";
import { Button } from "@/components/ui/button";
import { useTabStore } from "@/store/tab-store";
import { ArrowLeftIcon } from "lucide-react";

export default function AboutPage() {
  const { setTab } = useTabStore();
  return (
    <FadeIn.Container className="mx-auto max-w-md px-4 py-20 text-center">
      <FadeIn.Item>
        <h1 className="mb-4 font-semibold text-2xl">About Miniwrit</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Miniwrit is a clean and minimal space to capture your thoughts, write
          freely, and focus on what truly matters — your words.
        </p>

        <div className="mt-8 text-muted-foreground text-xs">
          <p>Version 0.1.0</p>
          <p className="mt-1">
            Built by{" "}
            <span className="font-medium text-foreground">tanlucvn</span>
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => setTab("writes")}
          className="mt-8 h-6 text-xs outline-double outline-2 outline-border outline-offset-2"
        >
          <ArrowLeftIcon className="mr-1 h-4 w-4" />
          Back
        </Button>
      </FadeIn.Item>
    </FadeIn.Container>
  );
}
