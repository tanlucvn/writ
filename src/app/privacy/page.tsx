import { Container, Item } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

const PrivacyPage = () => {
  return (
    <Container className="flex size-full items-center justify-center px-4 py-20 text-center">
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

        <Button variant="secondary" size="sm" className="mt-8">
          <Link href="/" className="flex items-center gap-1">
            <ArrowLeftIcon className="size-4" />
            Back
          </Link>
        </Button>
      </Item>
    </Container>
  );
};

export default PrivacyPage;
