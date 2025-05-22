"use client";

import * as React from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import DashedContainer from "./dashed-container";

interface BaseProps {
  children: React.ReactNode;
}

interface RootCredenzaProps extends BaseProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface CredenzaProps extends BaseProps {
  className?: string;
  asChild?: true;
}

const CredenzaContext = React.createContext<{ isMobile: boolean }>({
  isMobile: false,
});

const useCredenzaContext = () => {
  const context = React.useContext(CredenzaContext);
  if (!context) {
    throw new Error(
      "Credenza components cannot be rendered outside the Credenza Context",
    );
  }
  return context;
};

const Credenza = ({ children, ...props }: RootCredenzaProps) => {
  const isMobile = useIsMobile();
  const Credenza = isMobile ? Drawer : Dialog;

  return (
    <CredenzaContext.Provider value={{ isMobile }}>
      <Credenza {...props} {...(isMobile && { autoFocus: true })}>
        {children}
      </Credenza>
    </CredenzaContext.Provider>
  );
};

const CredenzaTrigger = ({ className, children, ...props }: CredenzaProps) => {
  const { isMobile } = useCredenzaContext();
  const CredenzaTrigger = isMobile ? DrawerTrigger : DialogTrigger;

  return (
    <CredenzaTrigger className={className} {...props}>
      {children}
    </CredenzaTrigger>
  );
};

const CredenzaClose = ({ className, children, ...props }: CredenzaProps) => {
  const { isMobile } = useCredenzaContext();
  const CredenzaClose = isMobile ? DrawerClose : DialogClose;

  return (
    <CredenzaClose className={className} {...props}>
      {children}
    </CredenzaClose>
  );
};

const CredenzaContent = ({ className, children, ...props }: CredenzaProps) => {
  const { isMobile } = useCredenzaContext();
  const CredenzaContent = isMobile ? DrawerContent : DialogContent;

  return (
    <CredenzaContent className={className} {...props}>
      <DashedContainer className="p-6">{children}</DashedContainer>
    </CredenzaContent>
  );
};

const CredenzaDescription = ({
  className,
  children,
  ...props
}: CredenzaProps) => {
  const { isMobile } = useCredenzaContext();
  const CredenzaDescription = isMobile ? DrawerDescription : DialogDescription;

  return (
    <CredenzaDescription
      className={cn(
        "select-none text-center font-mono text-muted-foreground text-xs",
        className,
      )}
      {...props}
    >
      {children}
    </CredenzaDescription>
  );
};

const CredenzaHeader = ({ className, children, ...props }: CredenzaProps) => {
  const { isMobile } = useCredenzaContext();
  const CredenzaHeader = isMobile ? DrawerHeader : DialogHeader;

  return (
    <CredenzaHeader className={cn("p-0", className)} {...props}>
      {children}
    </CredenzaHeader>
  );
};

const CredenzaTitle = ({ className, children, ...props }: CredenzaProps) => {
  const { isMobile } = useCredenzaContext();
  const CredenzaTitle = isMobile ? DrawerTitle : DialogTitle;

  return (
    <CredenzaTitle
      className={cn(
        "-translate-x-1/2 -translate-y-1/2 absolute top-0 left-1/2 select-none rounded-full border bg-background p-0.5",
        className,
      )}
      {...props}
    >
      <div className="rounded-full px-3 py-1.5 font-semibold text-sm leading-none">
        {children}
      </div>
    </CredenzaTitle>
  );
};

const CredenzaBody = ({ className, children, ...props }: CredenzaProps) => {
  return (
    <div className={cn("px-4 md:px-0", className)} {...props}>
      {children}
    </div>
  );
};

const CredenzaFooter = ({ className, children, ...props }: CredenzaProps) => {
  const { isMobile } = useCredenzaContext();
  const CredenzaFooter = isMobile ? DrawerFooter : DialogFooter;

  return (
    <CredenzaFooter className={className} {...props}>
      {children}
    </CredenzaFooter>
  );
};

export {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
};
