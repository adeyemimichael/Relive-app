import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import {
  MapPin,
  Users,
  Heart,
  Bookmark,
  Share2,
  BookmarkX,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Memory } from '../types';
import Card from './ui/Card';
import EmotionTag from './EmotionTag';
import { useMemories } from '../context/MemoryContext';

interface MemoryCardProps {
  memory: Memory;
  variant?: 'default' | 'compact';
  onShare: (memory: Memory) => void;
}

const MemoryCard: React.FC<MemoryCardProps> = ({
  memory,
  variant = 'default',
  onShare,
}) => {
  const {
    id,
    title,
    content,
    images,
    location,
    people,
    emotionTags,
    createdAt,
    isPinned,
    likes,
    isLikedByUser,
  } = memory;

  const { toggleLike } = useMemories();
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); 

  // Convert images to displayable URLs
  const displayImages = React.useMemo(() => {
    if (!images || images.length === 0) return [];
    return images.map((img) =>
      typeof img === 'string' ? img : URL.createObjectURL(img)
    );
  }, [images]);

 
  const firstImage = displayImages[0] || null;

  
 React.useEffect(() => {
  return () => {
    displayImages.forEach((img, index) => {
      if (typeof images[index] !== 'string') { 
        URL.revokeObjectURL(img);
      }
    });
  };
}, [displayImages, images]);

  const formattedDate = format(new Date(createdAt), 'MMM d, yyyy');
  const isCompact = variant === 'compact';

  const handleLike = () => {
    toggleLike(id);
  };

  const handleImageClick = () => {
    if (displayImages.length > 0) {
      setIsImageModalOpen(true);
      setCurrentImageIndex(0); 
    }
  };

  const handleCloseModal = () => {
    setIsImageModalOpen(false);
    setCurrentImageIndex(0); 
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? displayImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === displayImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <>
      <Card
        hover
        glassmorphism={!isCompact}
        className={`group ${isCompact ? 'h-full' : 'h-full'}`}
      >
        <div className="relative flex flex-col h-full">
          {/* ====================== IMAGE ====================== */}
          <div
            className={`relative overflow-hidden ${
              isCompact ? 'h-32' : 'h-48 sm:h-56 md:h-64'
            } ${firstImage ? 'cursor-pointer' : ''}`}
            onClick={handleImageClick}
          >
            {firstImage ? (
              <img
                src={firstImage}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                <span className="text-slate-500 dark:text-slate-400 text-sm">
                  No image
                </span>
              </div>
            )}

            {isPinned && (
              <div className="absolute top-3 right-3 bg-amber-500 text-white rounded-full p-1.5">
                <Bookmark className="h-4 w-4" />
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* ====================== CONTENT ====================== */}
          <div className="flex flex-col flex-grow p-4">
            {/* Title */}
            <h3 className="font-serif text-lg md:text-xl font-semibold text-slate-800 dark:text-white mb-2 line-clamp-1">
              {title}
            </h3>

          
            <p className="text-slate-600 dark:text-slate-300 mb-3 text-sm line-clamp-2">
              {content}
            </p>

            {/* Emotion tags (skip in compact mode) */}
            {!isCompact && emotionTags?.length > 0 && (
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

            {/* Actions */}
            <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={handleLike}
                className={`flex items-center transition-colors ${
                  isLikedByUser
                    ? 'text-rose-500 dark:text-rose-400'
                    : 'text-slate-500 hover:text-rose-500 dark:text-slate-400 dark:hover:text-rose-400'
                }`}
              >
                <Heart
                  className={`h-5 w-5 mr-1 ${isLikedByUser ? 'fill-current' : ''}`}
                />
                <span>{likes}</span>
              </button>

              <Link
                to={`/memory/${id}`}
                className="text-sm font-medium text-amber-600 hover:text-amber-700 dark:text-amber-500 dark:hover:text-amber-400 transition-colors"
              >
                View Memory
              </Link>

              <button
                onClick={() => onShare(memory)}
                className="text-slate-500 hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* ====================== IMAGE MODAL ====================== */}
      {isImageModalOpen && displayImages.length > 0 && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={handleCloseModal}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()} 
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
              aria-label="Close image modal"
            >
              <X className="h-8 w-8" />
            </button>

            {/* Image Display */}
            <img
              src={displayImages[currentImageIndex]}
              alt={`${title} - Image ${currentImageIndex + 1}`}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />

            
            {displayImages.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {displayImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full focus:outline-none ${
                        currentImageIndex === index
                          ? 'bg-white'
                          : 'bg-white/50 hover:bg-white/80'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MemoryCard;