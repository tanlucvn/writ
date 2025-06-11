import { Container, Item } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

const AboutPage = () => {
  return (
    <Container className="flex size-full items-center justify-center px-4 py-20 text-center">
      <Item>
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

export default AboutPage;
