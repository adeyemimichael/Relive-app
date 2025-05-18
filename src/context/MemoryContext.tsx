// context/MemoryContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { Memory } from '../types';
import { mockMemories } from '../data/mockData';

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const LS_KEY = 'memories_v1';

function loadMemories(): Memory[] {
  const raw = localStorage.getItem(LS_KEY);
  if (raw) {
    try {
      return JSON.parse(raw) as Memory[];
    } catch (_) {
      console.warn('Failed to parse memories from localStorage');
    }
  }
  // fallback to mocks on first run
  return mockMemories;
}

function persist(memories: Memory[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(memories));
}

function toDisplayImages(images: (string | File)[]): string[] {
  return images.map((img) =>
    img instanceof File ? URL.createObjectURL(img) : img,
  );
}

/* -------------------------------------------------------------------------- */
/*  Context                                                                    */
/* -------------------------------------------------------------------------- */

interface MemoryContextType {
  memories: Memory[];
  addMemory: (data: Omit<Memory, 'id' | 'createdAt'>) => void;
  updateMemory: (id: string, updates: Partial<Memory>) => void;
  deleteMemory: (id: string) => void;
  getMemoryById: (id: string) => Memory | undefined;
}

const MemoryContext = createContext<MemoryContextType | undefined>(undefined);

/* -------------------------------------------------------------------------- */

export const MemoryProvider = ({ children }: { children: ReactNode }) => {
  const [memories, setMemories] = useState<Memory[]>(() => loadMemories());

  /* Persist to localStorage whenever memories change */
  useEffect(() => {
    persist(memories);
  }, [memories]);

  /* -------------------------- CRUD functions --------------------------- */

  const addMemory = (data: Omit<Memory, 'id' | 'createdAt'>) => {
    const newMemory: Memory = {
      ...data,
      images: toDisplayImages(data.images),
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setMemories((prev) => [newMemory, ...prev]);
  };

  const updateMemory = (id: string, updates: Partial<Memory>) => {
    setMemories((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              ...updates,
              images: updates.images
                ? toDisplayImages(updates.images)
                : m.images,
            }
          : m,
      ),
    );
  };

  const deleteMemory = (id: string) => {
    setMemories((prev) => prev.filter((m) => m.id !== id));
  };

  const getMemoryById = (id: string) => memories.find((m) => m.id === id);

  /* -------------------------------------------------------------------- */

  return (
    <MemoryContext.Provider
      value={{ memories, addMemory, updateMemory, deleteMemory, getMemoryById }}
    >
      {children}
    </MemoryContext.Provider>
  );
};

/* -------------------------------------------------------------------------- */

export const useMemories = (): MemoryContextType => {
  const ctx = useContext(MemoryContext);
  if (!ctx) {
    throw new Error('useMemories must be used within a MemoryProvider');
  }
  return ctx;
};
