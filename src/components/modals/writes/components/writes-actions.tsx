"use client";

import { Button } from "@/components/ui/button";
import { useWritesStore } from "@/store/writes-store";
import type { Write } from "@/types";
import { FileDownIcon, FileUpIcon } from "lucide-react";
import { toast } from "sonner";

type Props = {
  filteredWrites: Write[];
  hasFilter: boolean;
};

const WritesActions = ({ filteredWrites, hasFilter }: Props) => {
  const { writes, importWrites } = useWritesStore();

  const handleExportWrites = () => {
    const toExport = hasFilter ? filteredWrites : writes;

    const dataStr = JSON.stringify(toExport, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = hasFilter
      ? "filtered-writes-export.json"
      : "all-writes-export.json";
    a.click();

    URL.revokeObjectURL(url);
  };

  const handleImportWrites = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";

    input.onchange = async (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;

      try {
        const text = await file.text();
        const importedWrites: Write[] = JSON?.parse(text);

        if (
          !Array.isArray(importedWrites) ||
          !importedWrites.every((w) => w.id && w.createdAt)
        ) {
          throw new Error("Invalid data format.");
        }

        importWrites(importedWrites);
        toast.success("Writes imported successfully!");
      } catch (err) {
        toast.error("Failed to import writes.");
        console.error("Import error:", err);
      }
    };

    input.click();
  };

  return (
    <div className="flex w-full items-center justify-end gap-3 px-4 py-2">
      <Button
        variant="outline"
        size="sm"
        className="text-xs"
        onClick={handleExportWrites}
      >
        <FileDownIcon className="mr-1 size-4" />
        {hasFilter ? "Export Filtered" : "Export All"}
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="text-xs"
        onClick={handleImportWrites}
      >
        <FileUpIcon className="mr-1 size-4" />
        Import
      </Button>
    </div>
  );
};

export default WritesActions;
