import { Memory, User } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'Sarah Johnson',
  avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  preferences: {
    aiEnabled: true,
    darkMode: false,
    reminderFrequency: 'daily'
  }
};

export const mockMemories: Memory[] = [
  {
    id: '1',
    title: 'Beach Sunset in Malibu',
    content: 'The sunset at Malibu beach was absolutely breathtaking today. The way the golden light reflected off the water created the most magical atmosphere.',
    aiGenerated: 'This moment seems to capture a profound sense of peace. The colors of the sunset appear to have created a transformative experience, inviting reflection on life\'s beauty.',
    images: [
      'https://images.pexels.com/photos/1139556/pexels-photo-1139556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1374064/pexels-photo-1374064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    location: 'Malibu, California',
    people: ['Alex', 'Jamie'],
    emotionTags: ['tranquility', 'wonder', 'gratitude'],
    createdAt: '2025-07-15T18:30:00.000Z',
    isPinned: true
  },
  {
    id: '2',
    title: 'Farmers Market Adventure',
    content: 'Spent the morning wandering through the local farmers market. The fresh peaches were incredible, and we picked up some homemade bread that smelled divine.',
    images: [
      'https://images.pexels.com/photos/2412950/pexels-photo-2412950.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    location: 'Downtown Farmers Market',
    people: ['Mom', 'Dad'],
    emotionTags: ['joy', 'gratitude'],
    createdAt: '2025-07-10T10:15:00.000Z'
  },
  {
    id: '3',
    title: 'Backyard BBQ with Friends',
    content: 'Had everyone over for a summer BBQ. Mike brought his famous potato salad, and we played lawn games until the sun went down. Perfect summer evening.',
    aiGenerated: 'Your gathering seems to embody the essence of summer friendship. These connections appear particularly meaningful against the backdrop of shared food and laughter.',
    images: [
      'https://images.pexels.com/photos/1267244/pexels-photo-1267244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    location: 'Home',
    people: ['Mike', 'Lisa', 'Jordan', 'Taylor'],
    emotionTags: ['joy', 'love', 'gratitude'],
    createdAt: '2025-07-08T19:20:00.000Z'
  },
  {
    id: '4',
    title: 'Mountain Hiking Trail',
    content: 'Finally conquered the Summit Ridge trail! The view from the top was worth every step. Could see for miles in every direction.',
    images: [
      'https://images.pexels.com/photos/733162/pexels-photo-733162.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    location: 'Summit Ridge Trail',
    people: ['Alex'],
    emotionTags: ['excitement', 'wonder', 'adventure'],
    createdAt: '2025-07-02T12:45:00.000Z'
  },
  {
    id: '5',
    title: 'Childhood Ice Cream Shop',
    content: 'Revisited the ice cream shop from my childhood. They still have my favorite flavor, and it tasted exactly how I remembered. Some things never change.',
    aiGenerated: 'This experience appears to connect you deeply with your past. The familiar taste seems to have unlocked a flood of childhood memories and emotions.',
    images: [
      'https://images.pexels.com/photos/1739347/pexels-photo-1739347.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    location: 'Sweet Memories Ice Cream',
    emotionTags: ['nostalgia', 'joy'],
    createdAt: '2025-06-28T15:30:00.000Z'
  }
];