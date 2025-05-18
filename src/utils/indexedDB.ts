import Dexie, { Table } from 'dexie';

export interface MediaItem {
  id: string;           // same shape you already use
  url: string;
  type: 'image' | 'video';
  category: string;
}

export type EmotionTag =
  | 'joy'
  | 'nostalgia'
  | 'tranquility'
  | 'excitement'
  | 'wonder'
  | 'gratitude'
  | 'love'
  | 'adventure';

export interface Memory {
id: string;
  title: string;
  content: string;
  aiGenerated?: string;
  images: string[];
  location?: string;
  people?: string[];
  emotionTags: EmotionTag[];
  createdAt: string;
  isPinned?: boolean;
}

class AppDB extends Dexie {
  media!: Table<MediaItem, string>;
  memories!: Table<Memory, string>;
  profile!: Table<{ key: string; value: any }, string>;

  constructor() {
    super('summerMemoriesDB');
    this.version(1).stores({
      media: 'id, category',
      memories: 'id, createdAt',
      profile: 'key'
    });
  }
}

export const db = new AppDB();
