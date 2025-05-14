import React from 'react';
import { EmotionTag as EmotionTagType } from '../types';

interface EmotionTagProps {
  emotion: EmotionTagType;
  size?: 'sm' | 'md';
}

const EmotionTag: React.FC<EmotionTagProps> = ({ emotion, size = 'md' }) => {
  const getEmotionColor = (emotion: EmotionTagType) => {
    const colors = {
      joy: {
        bg: 'bg-yellow-100 dark:bg-yellow-900/30',
        text: 'text-yellow-700 dark:text-yellow-300',
      },
      nostalgia: {
        bg: 'bg-purple-100 dark:bg-purple-900/30',
        text: 'text-purple-700 dark:text-purple-300',
      },
      tranquility: {
        bg: 'bg-blue-100 dark:bg-blue-900/30',
        text: 'text-blue-700 dark:text-blue-300',
      },
      excitement: {
        bg: 'bg-red-100 dark:bg-red-900/30',
        text: 'text-red-700 dark:text-red-300',
      },
      wonder: {
        bg: 'bg-indigo-100 dark:bg-indigo-900/30',
        text: 'text-indigo-700 dark:text-indigo-300',
      },
      gratitude: {
        bg: 'bg-green-100 dark:bg-green-900/30',
        text: 'text-green-700 dark:text-green-300',
      },
      love: {
        bg: 'bg-rose-100 dark:bg-rose-900/30',
        text: 'text-rose-700 dark:text-rose-300',
      },
      adventure: {
        bg: 'bg-orange-100 dark:bg-orange-900/30',
        text: 'text-orange-700 dark:text-orange-300',
      },
    };
    
    return colors[emotion] || { bg: 'bg-gray-100', text: 'text-gray-700' };
  };
  
  const sizeClasses = {
    sm: 'text-xs py-0.5 px-2',
    md: 'text-sm py-1 px-3',
  };

  const { bg, text } = getEmotionColor(emotion);
  
  return (
    <span 
      className={`${bg} ${text} ${sizeClasses[size]} rounded-full font-medium inline-flex items-center justify-center`}
    >
      {emotion.charAt(0).toUpperCase() + emotion.slice(1)}
    </span>
  );
};

export default EmotionTag;