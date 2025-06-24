"use client";

import { IconRenderer } from "@/components/icon-renderer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSessionActions } from "@/hooks/use-session-actions";
import type { Session } from "@/types";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

interface SessionControlsDropdownProps {
  session: Session;
  children: ReactNode;
}

export function SessionControlsDropdown({
  session,
  children,
}: SessionControlsDropdownProps) {
  const { onDeleteSession, onUpdateSession } = useSessionActions();

  const router = useRouter();

  const handleEditLabel = () => {
    const newLabel = prompt("Edit session label:", session.label ?? "");
    if (newLabel && newLabel.trim()) {
      onUpdateSession({
        ...session,
        label: newLabel.trim(),
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end" forceMount>
        <DropdownMenuItem
          className="gap-2"
          onClick={() => router.push(`/app/${session.noteId}`)}
        >
          <IconRenderer name="File" className="!text-primary size-4" />
          <span>View Note</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="gap-2" onClick={handleEditLabel}>
          <IconRenderer name="Edit3" className="!text-primary size-4" />
          <span>Edit Label</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="!text-destructive gap-2"
          onClick={() => onDeleteSession(session.id)}
        >
          <IconRenderer name="Trash2" className="!text-destructive size-4" />
          <span>Delete Session</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
