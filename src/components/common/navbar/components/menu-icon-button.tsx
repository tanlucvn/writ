import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const IconButton = ({
  icon,
  onClick,
  label,
}: {
  icon: React.ReactNode;
  onClick: () => void;
  label: string;
}) => (
  <Tooltip delayDuration={150}>
    <TooltipTrigger asChild>
      <Button
        variant="secondary"
        size="icon"
        onClick={onClick}
        className="size-8 outline-double outline-1 outline-border outline-offset-2"
      >
        {icon}
      </Button>
    </TooltipTrigger>
    <TooltipContent side="top">
      <p>{label}</p>
    </TooltipContent>
  </Tooltip>
);

export default IconButton;
