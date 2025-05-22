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
  likes: number; 
  isLikedByUser: boolean; 
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  preferences: {
    aiEnabled: boolean;
    darkMode: boolean;
    reminderFrequency?: 'daily' | 'weekly' | 'monthly';
  }
}