import  { createContext, useContext, useState, ReactNode } from 'react';
import { Memory, EmotionTag } from '../types';
import { mockMemories } from '../data/mockData';

interface MemoryContextType {
  memories: Memory[];
  addMemory: (memory: Omit<Memory, 'id' | 'createdAt'>) => void;
  updateMemory: (id: string, updates: Partial<Memory>) => void;
  deleteMemory: (id: string) => void;
  getMemoryById: (id: string) => Memory | undefined;
}

const MemoryContext = createContext<MemoryContextType | undefined>(undefined);

export const MemoryProvider = ({ children }: { children: ReactNode }) => {
  const [memories, setMemories] = useState<Memory[]>(mockMemories);

  const addMemory = (memory: Omit<Memory, 'id' | 'createdAt'>) => {
    const newMemory: Memory = {
      ...memory,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setMemories(prev => [newMemory, ...prev]);
  };

  const updateMemory = (id: string, updates: Partial<Memory>) => {
    setMemories(prev =>
      prev.map(memory => (memory.id === id ? { ...memory, ...updates } : memory))
    );
  };

  const deleteMemory = (id: string) => {
    setMemories(prev => prev.filter(memory => memory.id !== id));
  };

  const getMemoryById = (id: string) => {
    return memories.find(memory => memory.id === id);
  };

  return (
    <MemoryContext.Provider
      value={{ memories, addMemory, updateMemory, deleteMemory, getMemoryById }}
    >
      {children}
    </MemoryContext.Provider>
  );
};

export const useMemories = (): MemoryContextType => {
  const context = useContext(MemoryContext);
  if (context === undefined) {
    throw new Error('useMemories must be used within a MemoryProvider');
  }
  return context;
};