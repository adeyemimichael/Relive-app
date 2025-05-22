import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import Dexie, { Table } from 'dexie';
import { Memory, User, Story, Space, SpaceMember } from '../types';
import { mockMemories } from '../data/mockData';

class MemoriesDB extends Dexie {
  memories!: Table<Memory, string>;
  user!: Table<User, string>;
  stories!: Table<Story, string>;
  spaces!: Table<Space, string>;
  spaceMembers!: Table<SpaceMember, [string, string]>;

  constructor() {
    super('MemoriesDB');
    this.version(8).stores({
      memories: 'id, createdAt, likes, spaceId',
      user: 'id',
      stories: 'id, createdAt',
      spaces: 'id, createdAt',
      spaceMembers: '[spaceId+userId], spaceId, userId',
    });
  }
}

const db = new MemoriesDB();

const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

interface MemoryContextType {
  memories: Memory[];
  user: User | null;
  stories: Story[];
  spaces: Space[];
  spaceMembers: SpaceMember[];
  addMemory: (data: Omit<Memory, 'id' | 'createdAt'>, spaceId?: string) => Promise<void>;
  updateMemory: (id: string, changes: Partial<Memory>) => Promise<void>;
  deleteMemory: (id: string) => Promise<void>;
  getMemoryById: (id: string) => Memory | undefined;
  toggleLike: (id: string) => Promise<void>;
  updateUser: (changes: Partial<User>) => Promise<void>;
  getStats: () => { memories: number; photos: number; aiReflections: number };
  shouldShowReminder: () => boolean;
  markReminderShown: () => Promise<void>;
  snoozeReminder: (until: string) => Promise<void>;
  generateStory: (theme?: string) => Promise<void>;
  deleteStory: (id: string) => Promise<void>;
  createSpace: (title: string, description: string) => Promise<void>;
  joinSpace: (spaceId: string, userId: string, role: 'admin' | 'editor' | 'viewer') => Promise<void>;
  leaveSpace: (spaceId: string, userId: string) => Promise<void>;
  getSpaceMemories: (spaceId: string) => Memory[];
}

const MemoryContext = createContext<MemoryContextType | undefined>(undefined);

export const MemoryProvider = ({ children }: { children: ReactNode }) => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [stories, setStories] = useState<Story[]>([]);
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [spaceMembers, setSpaceMembers] = useState<SpaceMember[]>([]);

  useEffect(() => {
    (async () => {
      const memoryRows = await db.memories.toArray();
      if (memoryRows.length === 0) {
        const seededMemories = mockMemories.map((memory) => ({
          ...memory,
          likes: memory.likes ?? 0,
          isLikedByUser: memory.isLikedByUser ?? false,
        }));
        await db.memories.bulkAdd(seededMemories);
        setMemories(seededMemories);
      } else {
        const updatedRows = memoryRows.map((memory) => ({
          ...memory,
          likes: memory.likes ?? 0,
          isLikedByUser: memory.isLikedByUser ?? false,
        }));
        await db.memories.bulkPut(updatedRows);
        setMemories(updatedRows);
      }

      const userRows = await db.user.toArray();
      if (userRows.length === 0) {
        const defaultUser: User = {
          id: '1',
          name: 'Sarah Johnson',
          avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          preferences: {
            aiEnabled: true,
            reminderFrequency: 'daily',
          },
        };
        await db.user.add(defaultUser);
        setUser(defaultUser);
      } else {
        setUser(userRows[0]);
      }

      const storyRows = await db.stories.toArray();
      setStories(storyRows);

      const spaceRows = await db.spaces.toArray();
      setSpaces(spaceRows);

      const memberRows = await db.spaceMembers.toArray();
      setSpaceMembers(memberRows);
    })();
  }, []);

  useEffect(() => {
    const sub = Dexie.liveQuery(() => db.memories.toArray()).subscribe({
      next: (rows) => {
        const updatedRows = rows.map((memory) => ({
          ...memory,
          likes: memory.likes ?? 0,
          isLikedByUser: memory.isLikedByUser ?? false,
          aiGenerated: user?.preferences.aiEnabled ? memory.aiGenerated : undefined,
        }));
        setMemories(updatedRows);
      },
      error: console.error,
    });
    return () => sub.unsubscribe();
  }, [user?.preferences.aiEnabled]);

  useEffect(() => {
    const sub = Dexie.liveQuery(() => db.user.toArray()).subscribe({
      next: (rows) => {
        if (rows[0]) setUser(rows[0]);
      },
      error: console.error,
    });
    return () => sub.unsubscribe();
  }, []);

  useEffect(() => {
    const sub = Dexie.liveQuery(() => db.stories.toArray()).subscribe({
      next: (rows) => setStories(rows),
      error: console.error,
    });
    return () => sub.unsubscribe();
  }, []);

  useEffect(() => {
    const sub = Dexie.liveQuery(() => db.spaces.toArray()).subscribe({
      next: (rows) => setSpaces(rows),
      error: console.error,
    });
    return () => sub.unsubscribe();
  }, []);

  useEffect(() => {
    const sub = Dexie.liveQuery(() => db.spaceMembers.toArray()).subscribe({
      next: (rows) => setSpaceMembers(rows),
      error: console.error,
    });
    return () => sub.unsubscribe();
  }, []);

  const addMemory = useCallback(
    async (data: Omit<Memory, 'id' | 'createdAt'>, spaceId?: string) => {
      const images = await Promise.all(
        data.images.map(async (img) =>
          typeof img !== 'string' ? await toBase64(img) : img
        )
      );
      const newMemory: Memory = {
        ...data,
        images,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        likes: 0,
        isLikedByUser: false,
        aiGenerated: user?.preferences.aiEnabled ? data.aiGenerated : undefined,
        spaceId,
      };
      await db.memories.add(newMemory);
    },
    [user?.preferences.aiEnabled]
  );

  const updateMemory = useCallback(
    async (id: string, changes: Partial<Memory>) => {
      if (changes.images) {
        const images = await Promise.all(
          changes.images.map(async (img) =>
            typeof img !== 'string' ? await toBase64(img) : img
          )
        );
        await db.memories.update(id, { ...changes, images });
      } else {
        await db.memories.update(id, {
          ...changes,
          aiGenerated: user?.preferences.aiEnabled ? changes.aiGenerated : undefined,
        });
      }
    },
    [user?.preferences.aiEnabled]
  );

  const deleteMemory = useCallback(async (id: string) => {
    await db.memories.delete(id);
  }, []);

  const getMemoryById = useCallback(
    (id: string) => memories.find((m) => m.id === id),
    [memories]
  );

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

  const updateUser = useCallback(async (changes: Partial<User>) => {
    await db.user.update('1', changes);
  }, []);

  const getStats = useCallback(() => {
    const photos = memories.reduce((sum, m) => sum + m.images.length, 0);
    const aiReflections = memories.filter((m) => !!m.aiGenerated).length;
    return {
      memories: memories.length,
      photos,
      aiReflections,
    };
  }, [memories]);

  const shouldShowReminder = useCallback(() => {
    if (!user?.preferences.reminderFrequency) return false;
    const now = new Date();
    const lastReminder = user.preferences.lastReminder
      ? new Date(user.preferences.lastReminder)
      : null;
    const snoozedUntil = user.preferences.snoozedUntil
      ? new Date(user.preferences.snoozedUntil)
      : null;

    if (snoozedUntil && now < snoozedUntil) return false;

    if (!lastReminder) return true;

    const diffHours = (now.getTime() - lastReminder.getTime()) / (1000 * 60 * 60);
    switch (user.preferences.reminderFrequency) {
      case 'daily':
        return diffHours >= 24;
      case 'weekly':
        return diffHours >= 24 * 7;
      case 'monthly':
        return diffHours >= 24 * 30;
      default:
        return false;
    }
  }, [user]);

  const markReminderShown = useCallback(async () => {
    await updateUser({
      preferences: {
        ...user?.preferences,
        lastReminder: new Date().toISOString(),
      },
    });
  }, [user, updateUser]);

  const snoozeReminder = useCallback(
    async (until: string) => {
      await updateUser({
        preferences: {
          ...user?.preferences,
          snoozedUntil: until,
        },
      });
    },
    [user, updateUser]
  );

  const generateStory = useCallback(
    async (theme?: string) => {
      const selectedMemories = memories
        .filter((m) => (theme ? m.emotionTags.includes(theme) : true))
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        .slice(0, 5);

      const narration = selectedMemories.map((m) => {
        const base = m.aiGenerated || m.content.slice(0, 100);
        return `On ${new Date(m.createdAt).toLocaleDateString()}, you experienced "${m.title}". ${base}`;
      });

      const story: Story = {
        id: Date.now().toString(),
        title: theme ? `${theme.charAt(0).toUpperCase() + theme.slice(1)} Story` : 'Memory Highlights',
        memories: selectedMemories,
        narration,
        music: 'https://www.bensound.com/bensound-music/bensound-summer.mp3',
        createdAt: new Date().toISOString(),
      };

      await db.stories.add(story);
    },
    [memories]
  );

  const deleteStory = useCallback(async (id: string) => {
    await db.stories.delete(id);
  }, []);

  const createSpace = useCallback(
    async (title: string, description: string) => {
      if (!user) return;
      const space: Space = {
        id: Date.now().toString(),
        title,
        description,
        ownerId: user.id,
        createdAt: new Date().toISOString(),
      };
      await db.spaces.add(space);
      await joinSpace(space.id, user.id, 'admin');
    },
    [user]
  );

  const joinSpace = useCallback(
    async (spaceId: string, userId: string, role: 'admin' | 'editor' | 'viewer') => {
      const member: SpaceMember = {
        spaceId,
        userId,
        role,
        joinedAt: new Date().toISOString(),
      };
      await db.spaceMembers.add(member);
    },
    []
  );

  const leaveSpace = useCallback(
    async (spaceId: string, userId: string) => {
      await db.spaceMembers.delete([spaceId, userId]);
    },
    []
  );

  const getSpaceMemories = useCallback(
    (spaceId: string) => memories.filter((m) => m.spaceId === spaceId),
    [memories]
  );

  const value: MemoryContextType = {
    memories,
    user,
    stories,
    spaces,
    spaceMembers,
    addMemory,
    updateMemory,
    deleteMemory,
    getMemoryById,
    toggleLike,
    updateUser,
    getStats,
    shouldShowReminder,
    markReminderShown,
    snoozeReminder,
    generateStory,
    deleteStory,
    createSpace,
    joinSpace,
    leaveSpace,
    getSpaceMemories,
  };

  return <MemoryContext.Provider value={value}>{children}</MemoryContext.Provider>;
};

export const useMemories = () => {
  const ctx = useContext(MemoryContext);
  if (!ctx) {
    throw new Error('useMemories must be used within a MemoryProvider');
  }
  return ctx;
};