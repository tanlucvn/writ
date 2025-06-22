"use client";

import { useTagStore } from "@/store/use-tags-store";
import { useEffect } from "react";

export const TagDataInitializer = () => {
  const { loadTags } = useTagStore();

  useEffect(() => {
    loadTags();
  }, [loadTags]);

  return null;
};
