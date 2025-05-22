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
    this.version(2).stores({
      memories: 'id, createdAt, likes',
    });
  }
}

const db = new MemoriesDB();



function toDisplayImages(images: (string | File)[]): string[] {
  return images.map((img) =>
    img instanceof File ? URL.createObjectURL(img) : img,
  );
}



interface MemoryContextType {
  memories: Memory[];
  addMemory: (data: Omit<Memory, 'id' | 'createdAt'>) => void;
  updateMemory: (id: string, changes: Partial<Memory>) => void;
  deleteMemory: (id: string) => void;
  getMemoryById: (id: string) => Memory | undefined;
  toggleLike: (id: string) => void;
}

const MemoryContext = createContext<MemoryContextType | undefined>(undefined);

/* ─────────────────────────── provider component ───────────────────────── */

export const MemoryProvider = ({ children }: { children: ReactNode }) => {
  const [memories, setMemories] = useState<Memory[]>([]);


  useEffect(() => {
    (async () => {
      const rows = await db.memories.toArray();
      if (rows.length === 0) {
        
        const seededMemories = mockMemories.map(memory => ({
          ...memory,
          likes: memory.likes ?? 0,
          isLikedByUser: memory.isLikedByUser ?? false,
        }));
        await db.memories.bulkAdd(seededMemories);
        setMemories(seededMemories);
      } else {
       
        const updatedRows = rows.map(memory => ({
          ...memory,
          likes: memory.likes ?? 0,
          isLikedByUser: memory.isLikedByUser ?? false,
        }));
        await db.memories.bulkPut(updatedRows);
        setMemories(updatedRows);
      }
    })();
  }, []);

 
  useEffect(() => {
    const sub = Dexie.liveQuery(() => db.memories.toArray()).subscribe({
      next: (rows) => {
        
        const updatedRows = rows.map(memory => ({
          ...memory,
          likes: memory.likes ?? 0,
          isLikedByUser: memory.isLikedByUser ?? false,
        }));
        setMemories(updatedRows);
      },
      error: console.error,
    });
    return () => sub.unsubscribe();
  }, []);

 

  const addMemory = useCallback(
    async (data: Omit<Memory, 'id' | 'createdAt'>) => {
      const newMemory: Memory = {
        ...data,
        images: toDisplayImages(data.images),
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        likes: 0,
        isLikedByUser: false,
      };
      await db.memories.add(newMemory);
    
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

  const toggleLike = useCallback(async (id: string) => {
    const memory = await db.memories.get(id);
    if (!memory) return;

    const isLiked = !memory.isLikedByUser;
    const changes: Partial<Memory> = {
      likes: isLiked ? (memory.likes ?? 0) + 1 : (memory.likes ?? 0) - 1,
      isLikedByUser: isLiked,
    };

    await db.memories.update(id, changes);
    
  }, []);

 
  const value: MemoryContextType = {
    memories,
    addMemory,
    updateMemory,
    deleteMemory,
    getMemoryById,
    toggleLike,
  };

  return (
    <MemoryContext.Provider value={value}>
      {children}
    </MemoryContext.Provider>
  );
};


export const useMemories = () => {
  const ctx = useContext(MemoryContext);
  if (!ctx) {
    throw new Error('useMemories must be used within a MemoryProvider');
  }
  return ctx;
};