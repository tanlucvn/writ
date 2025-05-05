import type React from "react";
import Logo from "./logo";

const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-background">
      <div className="animate-spin-slow">
        <Logo width={35} height={35} />
      </div>
    </div>
  );
};

export default Loading;
