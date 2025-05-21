import { dexie } from "@/services";
import type { Folders } from "@/types";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";

interface FoldersStore {
  folders: Folders[];
  setFolders: (folders: Folders[]) => void;

  currentFolder: Folders | null;
  setCurrentFolder: (folder: Folders | null) => void;

  currentEditFolder: Folders | null;
  setCurrentEditFolder: (folder: Folders | null) => void;

  refreshFolders: () => Promise<void>;
  createNewFolder: (title?: string) => Promise<void>;
  updateFolderTitle: (id: string, title: string) => Promise<void>;
  deleteFolder: (id: string) => Promise<void>;

  initFoldersDB: () => Promise<void>;
}

export const useFoldersStore = create<FoldersStore>((set, get) => ({
  folders: [],
  setFolders: (folders) => set({ folders }),

  currentFolder: null,
  setCurrentFolder: (folder) => set({ currentFolder: folder }),

  currentEditFolder: null,
  setCurrentEditFolder: (folder) => set({ currentEditFolder: folder }),

  refreshFolders: async () => {
    const allFolders = await dexie.getAllFolders();
    set({ folders: allFolders });

    const { currentFolder, setCurrentFolder } = get();
    if (currentFolder && !allFolders.some((f) => f.id === currentFolder.id)) {
      setCurrentFolder(null);
    }
  },

  createNewFolder: async (title = "New Folder") => {
    const { folders, refreshFolders, setCurrentFolder } = get();
    const lastOrder = folders.length ? folders[folders.length - 1].order : 0;

    const newFolder: Folders = {
      id: uuidv4(),
      title,
      order: lastOrder + 1,
    };

    await dexie.createFolder(newFolder);
    toast.success("New folder created!");
    await refreshFolders();
    setCurrentFolder(newFolder);
  },

  updateFolderTitle: async (id, title) => {
    await dexie.updateFolderTitle(id, title);
    toast.success("Folder title updated!");
    await get().refreshFolders();
  },

  deleteFolder: async (id) => {
    await dexie.deleteFolder(id);
    toast.success("Folder deleted!");
    await get().refreshFolders();
  },

  initFoldersDB: async () => {
    try {
      const { setFolders, setCurrentFolder } = get();

      const allFolders = await dexie.getAllFolders();
      setFolders(allFolders);

      let folder = allFolders[0];
      if (!folder) {
        folder = {
          id: uuidv4(),
          title: "New Folder",
          order: 1,
        };
        await dexie.createFolder(folder);
        const updatedFolders = await dexie.getAllFolders();
        setFolders(updatedFolders);
      }

      setCurrentFolder(folder);
    } catch (error) {
      console.error("Error initializing folders:", error);
    }
  },
}));
