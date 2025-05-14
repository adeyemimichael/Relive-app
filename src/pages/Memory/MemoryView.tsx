import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Edit, Trash2, Share2, Heart, ChevronLeft, 
  ChevronRight, Calendar, MapPin, Users, MessageSquare,
  Bookmark, BookmarkX, ArrowLeft
} from 'lucide-react';
import { format } from 'date-fns';
import { useMemories } from '../../context/MemoryContext';
import Button from '../../components/ui/Button';
import EmotionTag from '../../components/EmotionTag';

const MemoryView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getMemoryById, updateMemory, deleteMemory } = useMemories();
  const memory = getMemoryById(id || '');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  
  if (!memory) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
          Memory not found
        </h2>
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          The memory you're looking for doesn't exist or has been deleted.
        </p>
        <Link to="/dashboard">
          <Button variant="primary">Back to Dashboard</Button>
        </Link>
      </div>
    );
  }
  
  const {
    title,
    content,
    aiGenerated,
    images,
    location,
    people,
    emotionTags,
    createdAt,
    isPinned
  } = memory;

  const formattedDate = format(new Date(createdAt), 'MMMM d, yyyy');
  
  const handleDeleteMemory = () => {
    deleteMemory(id || '');
    navigate('/dashboard');
  };
  
  const handleTogglePinned = () => {
    updateMemory(id || '', { isPinned: !isPinned });
  };
  
  const handlePrevImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };
  
  const handleNextImage = () => {
    setCurrentImageIndex(prev => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link 
          to="/dashboard" 
          className="inline-flex items-center text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-500 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden border border-slate-200 dark:border-slate-700">
        {/* Image Gallery */}
        {images.length > 0 && (
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px]">
            <img 
              src={images[currentImageIndex]} 
              alt={title} 
              className="w-full h-full object-cover"
            />
            {images.length > 1 && (
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
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {images.map((_, index) => (
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
        )}
        
        {/* Memory Content */}
        <div className="p-6 md:p-8">
          <div className="flex flex-wrap justify-between items-start mb-4">
            <h1 className="font-serif text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white mb-4 md:mb-0 pr-4">
              {title}
            </h1>
            
            <div className="flex space-x-2">
              <button
                onClick={handleTogglePinned}
                className={`p-2 rounded-md transition-colors ${
                  isPinned
                    ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-500'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'
                }`}
                aria-label={isPinned ? 'Unpin memory' : 'Pin memory'}
              >
                {isPinned ? (
                  <BookmarkX className="h-5 w-5" />
                ) : (
                  <Bookmark className="h-5 w-5" />
                )}
              </button>
              <Link to={`/edit/${id}`}>
                <button
                  className="p-2 rounded-md bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600 transition-colors"
                  aria-label="Edit memory"
                >
                  <Edit className="h-5 w-5" />
                </button>
              </Link>
              <button
                onClick={() => setIsDeleteConfirmOpen(true)}
                className="p-2 rounded-md bg-slate-100 text-rose-500 hover:bg-rose-100 dark:bg-slate-700 dark:hover:bg-rose-900/30 transition-colors"
                aria-label="Delete memory"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {/* Memory Metadata */}
          <div className="flex flex-wrap text-sm text-slate-500 dark:text-slate-400 mb-6 gap-y-2">
            <div className="flex items-center mr-6">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{formattedDate}</span>
            </div>
            
            {location && (
              <div className="flex items-center mr-6">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{location}</span>
              </div>
            )}
            
            {people && people.length > 0 && (
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                <span>{people.join(', ')}</span>
              </div>
            )}
          </div>
          
          {/* Emotion Tags */}
          {emotionTags && emotionTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {emotionTags.map(tag => (
                <EmotionTag key={tag} emotion={tag} size="md" />
              ))}
            </div>
          )}
          
          {/* Memory Content */}
          <div className="prose dark:prose-invert max-w-none mb-8">
            <p className="text-slate-700 dark:text-slate-300 whitespace-pre-line">
              {content}
            </p>
          </div>
          
          {/* AI Generated Insights */}
          {aiGenerated && (
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-8 border border-blue-100 dark:border-blue-800/50">
              <div className="flex items-start mb-4">
                <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0 mt-1" />
                <h3 className="font-medium text-blue-800 dark:text-blue-300">
                  AI-Generated Reflection
                </h3>
              </div>
              <p className="text-blue-700 dark:text-blue-300 italic">
                {aiGenerated}
              </p>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
            <button className="flex items-center text-slate-500 hover:text-rose-500 dark:text-slate-400 dark:hover:text-rose-400 transition-colors">
              <Heart className="h-5 w-5 mr-2" />
              <span>Like</span>
            </button>
            
            <button className="flex items-center text-slate-500 hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
              <Share2 className="h-5 w-5 mr-2" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 max-w-md w-full shadow-xl">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
              Delete this memory?
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              This action cannot be undone. This memory will be permanently deleted from your account.
            </p>
            <div className="flex space-x-3 justify-end">
              <Button 
                variant="outline" 
                onClick={() => setIsDeleteConfirmOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                className="bg-rose-600 hover:bg-rose-700"
                onClick={handleDeleteMemory}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoryView;