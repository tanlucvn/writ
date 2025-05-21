import { useDialogStore } from "@/store/dialog-store";
import {
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
} from "../ui/credenza";
import { Kbd } from "../ui/kbd";

const HelpDialog = () => {
  const { isHelpDialogOpen, setIsHelpDialogOpen } = useDialogStore();
  return (
    <Credenza open={isHelpDialogOpen} onOpenChange={setIsHelpDialogOpen}>
      <CredenzaContent className="mx-auto max-w-lg border bg-background p-1 shadow-none">
        <CredenzaHeader>
          <CredenzaDescription>
            Quickly navigate and operate using your keyboard.
          </CredenzaDescription>
          <CredenzaTitle>Keyboard Shortcuts</CredenzaTitle>
        </CredenzaHeader>

        <ul className="mt-4 space-y-2 text-muted-foreground text-sm">
          <li className="flex items-center gap-4">
            <Kbd keys="Alt+H" />
            <span>Show help</span>
          </li>
          <li className="flex items-center gap-4">
            <Kbd keys="Alt+N" />
            <span>Create new write</span>
          </li>
          <li className="flex items-center gap-4">
            <Kbd keys="Alt+Z" />
            <span>Toggle zen mode</span>
          </li>
          <li className="flex items-center gap-4">
            <Kbd keys="Alt+M" />
            <span>Open music player</span>
          </li>
          <li className="flex items-center gap-4">
            <Kbd keys="Alt+S" />
            <span>Open settings</span>
          </li>
          <li className="flex items-center gap-4">
            <Kbd keys="Esc" />
            <span>Close dialog</span>
          </li>
        </ul>
      </CredenzaContent>
    </Credenza>
  );
};

export default HelpDialog;
