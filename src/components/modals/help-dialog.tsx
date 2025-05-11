import { useDialogStore } from "@/store/dialog-store";
import {
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaTitle,
} from "../ui/credenza";
import DashedContainer from "../ui/dashed-container";
import { Kbd } from "../ui/kbd";

const HelpDialog = () => {
  const { isHelpDialogOpen, setIsHelpDialogOpen } = useDialogStore();
  return (
    <Credenza open={isHelpDialogOpen} onOpenChange={setIsHelpDialogOpen}>
      <CredenzaTitle className="sr-only">Help</CredenzaTitle>
      <CredenzaDescription className="sr-only">Help dialog</CredenzaDescription>
      <CredenzaContent className="p-1">
        <DashedContainer className="p-6">
          <div className="mt-6 flex flex-col space-y-4 sm:mt-0">
            <div className="flex flex-col gap-1">
              <p className="font-mono text-muted-foreground text-xs">
                Quickly navigate and operate using your keyboard.
              </p>
              <h1 className="font-medium text-foreground text-sm">
                Keyboard Shortcuts
              </h1>
            </div>

            <ul className="space-y-2 text-muted-foreground text-sm">
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
          </div>
        </DashedContainer>
      </CredenzaContent>
    </Credenza>
  );
};

export default HelpDialog;
