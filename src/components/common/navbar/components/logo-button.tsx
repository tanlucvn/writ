import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";

const LogoButton = ({
  toggleMenu,
}: {
  toggleMenu: () => void;
}) => (
  <div className="flex shrink-0 items-center gap-2 p-[3px]">
    <div
      className="group relative flex cursor-pointer items-center"
      onClick={toggleMenu}
    >
      <Button
        className="size-8 outline-1 outline-border outline-offset-2"
        size="icon"
        variant="secondary"
      >
        <Logo />
      </Button>
    </div>
  </div>
);

export default LogoButton;
