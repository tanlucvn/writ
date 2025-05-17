import type { Write } from "@/types";

type GroupedWrites = {
  pinned: Write[];
  recent: Write[];
  archived: Write[];
};

export function groupWrites(writes: Write[]): GroupedWrites {
  const pinned: Write[] = [];
  const recent: Write[] = [];
  const archived: Write[] = [];

  for (const write of writes) {
    if (write.archived) {
      archived.push(write);
    } else if (write.pinned) {
      pinned.push(write);
    } else {
      recent.push(write);
    }
  }

  return {
    pinned,
    recent,
    archived,
  };
}
