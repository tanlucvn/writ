import { v4 as uuidv4 } from "uuid";

export interface Write {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  fontFamily?: string;
  fontSize?: number;
}

const DB_NAME = "writesDB";
const STORE_NAME = "writes";
const VERSION = 1;

const openDB = (): Promise<IDBDatabase> =>
  new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, VERSION);

    request.onerror = () => reject("Failed to open database");

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
        store.createIndex("updatedAt", "updatedAt", { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
  });

// Get all writes (sorted by updatedAt desc)
export const getAllWrites = async (): Promise<Write[]> => {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const index = store.index("updatedAt");
    const request = index.openCursor(null, "prev");

    const writes: Write[] = [];

    request.onsuccess = () => {
      const cursor = request.result;
      if (cursor) {
        writes.push(cursor.value);
        cursor.continue();
      } else {
        resolve(writes);
      }
    };

    request.onerror = () => reject("Failed to load writes");
  });
};

export const getWrite = async (id: string): Promise<Write | null> => {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const request = store.get(id);

    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject("Failed to get write");
  });
};

export const saveWrite = async (write: Write): Promise<Write> => {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);

    const updatedWrite = {
      ...write,
      updatedAt: new Date(),
    };

    const request = store.put(updatedWrite);

    request.onsuccess = () => resolve(updatedWrite);
    request.onerror = () => reject("Failed to save write");
  });
};

export const deleteWrite = async (id: string): Promise<void> => {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const request = store.delete(id);

    request.onsuccess = () => resolve();
    request.onerror = () => reject("Failed to delete write");
  });
};

export const createWrite = (fontFamily = "inter", fontSize = 16): Write => ({
  id: uuidv4(),
  title: "Untitled",
  content: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  fontFamily,
  fontSize,
});

export const getLatestWrite = async (): Promise<Write | null> => {
  try {
    const writes = await getAllWrites();
    return writes[0] || null;
  } catch (err) {
    console.error("Failed to get latest write:", err);
    return null;
  }
};
