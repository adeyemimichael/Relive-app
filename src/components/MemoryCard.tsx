import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { MapPin, Users, Heart, Bookmark, Share2 } from 'lucide-react';
import { Memory } from '../types';
import Card from './ui/Card';
import EmotionTag from './EmotionTag';

interface MemoryCardProps {
  memory: Memory;
  variant?: 'default' | 'compact';
}

const MemoryCard: React.FC<MemoryCardProps> = ({ memory, variant = 'default' }) => {
  const {
    id,
    title,
    content,
    images,
    location,
    people,
    emotionTags,
    createdAt,
    isPinned
  } = memory;

  const formattedDate = format(new Date(createdAt), 'MMM d, yyyy');
  const isCompact = variant === 'compact';

  return (
    <Card 
      hover 
      glassmorphism={!isCompact}
      className={`group ${isCompact ? 'h-full' : 'h-full'}`}
    >
      <div className="relative flex flex-col h-full">
        {/* Image */}
        <div className={`relative overflow-hidden ${isCompact ? 'h-32' : 'h-48 sm:h-56 md:h-64'}`}>
          <img
            src={images[0]}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {isPinned && (
            <div className="absolute top-3 right-3 bg-amber-500 text-white rounded-full p-1.5">
              <Bookmark className="h-4 w-4" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow p-4">
          <h3 className="font-serif text-lg md:text-xl font-semibold text-slate-800 dark:text-white mb-2 line-clamp-1">
            {title}
          </h3>
          
          <p className="text-slate-600 dark:text-slate-300 mb-3 text-sm line-clamp-2">
            {content}
          </p>

          {/* Tags */}
          {!isCompact && emotionTags && emotionTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {emotionTags.map((tag) => (
                <EmotionTag key={tag} emotion={tag} />
              ))}
            </div>
          )}

          {/* Metadata */}
          <div className="mt-auto">
            <div className="flex flex-wrap items-center text-xs text-slate-500 dark:text-slate-400 space-x-3">
              <span>{formattedDate}</span>
              
              {location && (
                <span className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {location}
                </span>
              )}
              
              {people && people.length > 0 && (
                <span className="flex items-center">
                  <Users className="h-3 w-3 mr-1" />
                  {people.length} {people.length === 1 ? 'person' : 'people'}
                </span>
              )}
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button className="text-slate-500 hover:text-rose-500 dark:text-slate-400 dark:hover:text-rose-400 transition-colors">
              <Heart className="h-5 w-5" />
            </button>
            
            <Link 
              to={`/memory/${id}`}
              className="text-sm font-medium text-amber-600 hover:text-amber-700 dark:text-amber-500 dark:hover:text-amber-400 transition-colors"
            >
              View Memory
            </Link>
            
            <button className="text-slate-500 hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MemoryCard;