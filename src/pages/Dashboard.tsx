import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Filter, PlusCircle, 
  Calendar, SortAsc, SortDesc, 
  Bookmark, BookmarkX
} from 'lucide-react';
import { useMemories } from '../context/MemoryContext';
import MemoryCard from '../components/MemoryCard';
import Button from '../components/ui/Button';
import { EmotionTag } from '../types';

const Dashboard: React.FC = () => {
  const { memories, updateMemory } = useMemories();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMemories, setFilteredMemories] = useState(memories);
  const [selectedEmotions, setSelectedEmotions] = useState<EmotionTag[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const allEmotions: EmotionTag[] = [
    'joy', 'nostalgia', 'tranquility', 'excitement', 
    'wonder', 'gratitude', 'love', 'adventure'
  ];

  // Filter memories based on search term and selected emotions
  useEffect(() => {
    let result = memories;
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(memory => 
        memory.title.toLowerCase().includes(term) || 
        memory.content.toLowerCase().includes(term) ||
        (memory.location?.toLowerCase().includes(term)) ||
        (memory.people?.some(person => person.toLowerCase().includes(term)))
      );
    }
    
    // Filter by selected emotions
    if (selectedEmotions.length > 0) {
      result = result.filter(memory => 
        selectedEmotions.every(emotion => memory.emotionTags.includes(emotion))
      );
    }
    
    // Apply sorting
    result = [...result].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
    
    setFilteredMemories(result);
  }, [memories, searchTerm, selectedEmotions, sortOrder]);

  const togglePinMemory = (id: string, isPinned: boolean | undefined) => {
    updateMemory(id, { isPinned: !isPinned });
  };

  const toggleEmotionFilter = (emotion: EmotionTag) => {
    setSelectedEmotions(prev => 
      prev.includes(emotion)
        ? prev.filter(e => e !== emotion)
        : [...prev, emotion]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedEmotions([]);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white mb-2">
            Your Summer Memories
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Revisit and reflect on your captured moments
          </p>
        </div>
        <div className="flex gap-3">
          <Link to="/create">
            <Button 
              variant="primary" 
              icon={<PlusCircle className="h-5 w-5" />}
            >
              New Memory
            </Button>
          </Link>
          <button 
            onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
            className="p-2 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
            aria-label="Toggle sort order"
          >
            {sortOrder === 'asc' ? (
              <SortAsc className="h-5 w-5 text-slate-600 dark:text-slate-300" />
            ) : (
              <SortDesc className="h-5 w-5 text-slate-600 dark:text-slate-300" />
            )}
          </button>
        </div>
      </div>
      
      {/* Search and Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm border border-slate-200 dark:border-slate-700 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search memories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-600 outline-none transition"
            />
          </div>
          
          <div className="flex gap-2">
            <div className="relative">
              <button 
                className="inline-flex items-center px-4 py-2 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-200 transition-colors"
              >
                <Filter className="h-4 w-4 mr-2" />
                <span>Filter</span>
              </button>
            </div>
            
            {selectedEmotions.length > 0 && (
              <button 
                onClick={clearFilters}
                className="px-4 py-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-sm"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
        
        {/* Emotion Filters */}
        <div className="mt-4 flex flex-wrap gap-2">
          {allEmotions.map(emotion => (
            <button
              key={emotion}
              onClick={() => toggleEmotionFilter(emotion)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                selectedEmotions.includes(emotion)
                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 ring-2 ring-amber-500 dark:ring-amber-600'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              {emotion.charAt(0).toUpperCase() + emotion.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      {/* Pinned Memories */}
      {filteredMemories.some(memory => memory.isPinned) && (
        <div className="mb-8">
          <h2 className="font-serif text-xl font-medium text-slate-800 dark:text-white mb-4 flex items-center">
            <Bookmark className="h-5 w-5 text-amber-500 mr-2" />
            Pinned Memories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMemories
              .filter(memory => memory.isPinned)
              .map(memory => (
                <div key={memory.id} className="relative group">
                  <MemoryCard memory={memory} />
                  <button
                    onClick={() => togglePinMemory(memory.id, memory.isPinned)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 dark:bg-slate-800/80 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Unpin memory"
                  >
                    <BookmarkX className="h-4 w-4 text-amber-500" />
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}
      
      {/* All Memories */}
      <div>
        <h2 className="font-serif text-xl font-medium text-slate-800 dark:text-white mb-4 flex items-center">
          <Calendar className="h-5 w-5 text-amber-500 mr-2" />
          All Memories
        </h2>
        
        {filteredMemories.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-lg p-8 text-center shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="text-slate-400 dark:text-slate-500 mb-3">
              <Search className="h-12 w-12 mx-auto mb-2" />
            </div>
            <h3 className="text-xl font-medium text-slate-800 dark:text-white mb-2">
              No memories found
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              {searchTerm || selectedEmotions.length > 0
                ? "We couldn't find any memories matching your search criteria."
                : "You haven't created any memories yet. Start capturing your summer moments!"}
            </p>
            {searchTerm || selectedEmotions.length > 0 ? (
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            ) : (
              <Link to="/create">
                <Button 
                  variant="primary"
                  icon={<PlusCircle className="h-5 w-5" />}
                >
                  Create Your First Memory
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMemories
              .filter(memory => !memory.isPinned)
              .map(memory => (
                <div key={memory.id} className="relative group">
                  <MemoryCard memory={memory} />
                  <button
                    onClick={() => togglePinMemory(memory.id, memory.isPinned)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 dark:bg-slate-800/80 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Pin memory"
                  >
                    <Bookmark className="h-4 w-4 text-slate-400 hover:text-amber-500" />
                  </button>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;