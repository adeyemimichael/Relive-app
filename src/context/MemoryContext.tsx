
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import Dexie, { Table } from 'dexie';
import { Memory } from '../types';
import { mockMemories } from '../data/mockData';

/* ───────────────────────────── Dexie setup ────────────────────────────── */

class MemoriesDB extends Dexie {
  memories!: Table<Memory, string>;

  constructor() {
    super('MemoriesDB');
    this.version(1).stores({
      memories: 'id, createdAt', // primary key & index
    });
  }
}

const db = new MemoriesDB();

/* ─────────────────────────── helper functions ─────────────────────────── */

function toDisplayImages(images: (string | File)[]): string[] {
  return images.map((img) =>
    img instanceof File ? URL.createObjectURL(img) : img,
  );
}

/* ─────────────────────────── context contract ─────────────────────────── */

interface MemoryContextType {
  memories: Memory[];
  addMemory: (data: Omit<Memory, 'id' | 'createdAt'>) => void;
  updateMemory: (id: string, changes: Partial<Memory>) => void;
  deleteMemory: (id: string) => void;
  getMemoryById: (id: string) => Memory | undefined;
}

const MemoryContext = createContext<MemoryContextType | undefined>(undefined);

/* ─────────────────────────── provider component ───────────────────────── */

export const MemoryProvider = ({ children }: { children: ReactNode }) => {
  const [memories, setMemories] = useState<Memory[]>([]);

  /* ----------- initial load (once) ----------- */
  useEffect(() => {
    (async () => {
      const rows = await db.memories.toArray();
      if (rows.length === 0) {
        // seed with mock data on first run
        await db.memories.bulkAdd(mockMemories);
        setMemories(mockMemories);
      } else {
        setMemories(rows);
      }
    })();
  }, []);

  /* ----------- live query (keeps state in-sync) ----------- */
  useEffect(() => {
    const sub = Dexie.liveQuery(() => db.memories.toArray()).subscribe({
      next: setMemories,
      error: console.error,
    });
    return () => sub.unsubscribe();
  }, []);

  /* ------------------------- CRUD helpers ------------------------- */


  const addMemory = useCallback(
    async (data: Omit<Memory, 'id' | 'createdAt'>) => {
      const newMemory: Memory = {
        ...data,
        images: toDisplayImages(data.images),
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      await db.memories.add(newMemory);
      // state will refresh automatically via liveQuery
    },
    [],
  );

  const updateMemory = useCallback(
    async (id: string, changes: Partial<Memory>) => {
      await db.memories.update(id, {
        ...changes,
        ...(changes.images && {
          images: toDisplayImages(changes.images as any),
        }),
      });
    },
    [],
  );

  const deleteMemory = useCallback(async (id: string) => {
    await db.memories.delete(id);
  }, []);

  const getMemoryById = (id: string) =>
    memories.find((m) => m.id === id);

  /* -------------------------------------------------------------------- */

  const value: MemoryContextType = {
    memories,
    addMemory,
    updateMemory,
    deleteMemory,
    getMemoryById,
  };

  return (
    <MemoryContext.Provider value={value}>
      {children}
    </MemoryContext.Provider>
  );
};

/* ─────────────────────────────── hook ──────────────────────────────── */

export const useMemories = () => {
  const ctx = useContext(MemoryContext);
  if (!ctx) {
    throw new Error('useMemories must be used within a MemoryProvider');
  }
  return ctx;
};
