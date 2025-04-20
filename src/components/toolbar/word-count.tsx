"use client";

import { useAppStore } from "@/store/app-store";

export default function ToolbarWordCount() {
  const { currentWrite } = useAppStore();

  return (
    <div className="font-medium text-xs">
      {currentWrite?.content.length} <span className="font-normal">words</span>
    </div>
  );
}
