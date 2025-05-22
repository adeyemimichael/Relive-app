export interface Memory {
  id: string;
  title: string;
  content: string;
  images: string[];
  location?: string;
  people?: string[];
  emotionTags: string[];
  createdAt: string;
  isPinned?: boolean;
  aiGenerated?: string;
  likes: number;
  isLikedByUser: boolean;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  preferences: {
    aiEnabled: boolean;
    reminderFrequency: 'daily' | 'weekly' | 'monthly';
    lastReminder?: string; // ISO date of last reminder
    snoozedUntil?: string; // ISO date until snoozed
  };
}