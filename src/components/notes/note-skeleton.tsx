"use client";

import { Skeleton } from "@/components/ui/skeleton";

interface NoteSkeletonProps {
  withHeader?: boolean;
}

export function NoteSkeleton({ withHeader = true }: NoteSkeletonProps) {
  return (
    <main className="flex h-screen flex-col pb-3">
      {withHeader && (
        <header className="flex h-16 shrink-0 items-center justify-between gap-6 px-4">
          <div className="mx-auto flex w-full max-w-prose items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-sm" />
            <Skeleton className="h-4 w-[1px]" />
            <div className="grid grid-cols-1 gap-1 text-sm">
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
        </header>
      )}

      <div className="flex flex-1 flex-col gap-4 p-4 py-0">
        <div className="relative mx-auto flex h-full w-full max-w-prose flex-col justify-start space-y-2.5">
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="flex-1 rounded-md" />
        </div>
      </div>
    </main>
  );
}
