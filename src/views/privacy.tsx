import { Container, Item } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { useTabStore } from "@/store/tab-store";
import { ArrowLeftIcon } from "lucide-react";

const PrivacyPage = () => {
  const { setTab } = useTabStore();

  return (
    <Container className="mx-auto max-w-md px-4 py-20 text-center">
      <Item>
        <h1 className="mb-4 font-semibold text-2xl">Privacy Policy</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Your data belongs to you. Miniwrit does not collect, track, or share
          your personal information. All your writings are stored locally on
          your device.
        </p>

        <div className="mt-8 text-muted-foreground text-xs">
          <p>No accounts. No ads. No tracking.</p>
          <p className="mt-1">Focus on writing, without distractions.</p>
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
      </Item>
    </Container>
  );
};

export default PrivacyPage;
