import React, { useState, useRef } from 'react';
import { useMemories } from '../../context/MemoryContext';

interface SelectedMedia {
  url: string;
  type: 'image' | 'video';
  memoryTitle: string;
}

const Gallery: React.FC = () => {
  const { memories, setMemories } = useMemories();
  const [selectedMedia, setSelectedMedia] = useState<SelectedMedia | null>(null);
  const [categoryInput, setCategoryInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

 
  const mediaItems = memories.flatMap((memory) =>
    memory.images.map((url) => ({
      url,
      type: url.match(/\.(mp4|webm|ogg)$/i) ? 'video' : 'image',
      memoryTitle: memory.title,
    })),
  );


  const groupedMedia = mediaItems.reduce<Record<string, SelectedMedia[]>>(
    (acc, item) => {
      (acc[item.memoryTitle] ??= []).push(item);
      return acc;
    },
    {},
  );

  
  const handleUploadClick = () => {
    if (!categoryInput.trim()) {
      alert('Please enter a category / memory title before uploading.');
      return;
    }
    fileInputRef.current?.click();
  };

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !categoryInput.trim()) {
      alert('Please enter a category / memory title and select files.');
      return;
    }

    // Create new image URLs
    const newUrls = Array.from(files).map((file) => URL.createObjectURL(file));

    
    const existingMemoryIndex = memories.findIndex((m) => m.title === categoryInput.trim());

    let updatedMemories;

    if (existingMemoryIndex >= 0) {
     
      const updatedMemory = {
        ...memories[existingMemoryIndex],
        images: [...memories[existingMemoryIndex].images, ...newUrls],
      };
      updatedMemories = [
        ...memories.slice(0, existingMemoryIndex),
        updatedMemory,
        ...memories.slice(existingMemoryIndex + 1),
      ];
    } else {
      
      updatedMemories = [
        ...memories,
        { title: categoryInput.trim(), images: newUrls },
      ];
    }

    setMemories(updatedMemories);
    setCategoryInput('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  
  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6 dark:text-white">Memory Gallery</h1>

      {/* Upload Section */}
      <div className="mb-8 flex flex-wrap items-center gap-4">
        <input
          type="text"
          placeholder="Category / Memory title"
          value={categoryInput}
          onChange={(e) => setCategoryInput(e.target.value)}
          className="border rounded px-3 py-2 text-sm w-64 dark:bg-slate-800 dark:border-slate-600 dark:text-white"
        />

        <button
          onClick={handleUploadClick}
          className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition"
        >
          Upload Images / Videos
        </button>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFilesChange}
          multiple
          accept="image/*,video/*"
          className="hidden"
        />
      </div>

      {memories.length === 0 && (
        <p className="text-gray-600 dark:text-gray-400">No memories uploaded yet.</p>
      )}

      {Object.entries(groupedMedia).map(([memoryTitle, items]) => (
        <div key={memoryTitle} className="mb-12">
          <h2 className="text-xl font-semibold mb-4 border-b pb-1 dark:text-white">{memoryTitle}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {items.map(({ url, type }, index) => (
              <div
                key={`${url}-${index}`}
                className="relative rounded overflow-hidden shadow-md cursor-pointer"
                onClick={() => setSelectedMedia({ url, type, memoryTitle })}
              >
                {type === 'image' ? (
                  <img src={url} alt={memoryTitle} className="w-full h-48 object-cover rounded" />
                ) : (
                  <video
                    src={url}
                    className="w-full h-48 rounded bg-black object-cover"
                    muted
                    playsInline
                    preload="metadata"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Light-box Modal */}
      {selectedMedia && (
        <div
          className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 p-4"
          onClick={() => setSelectedMedia(null)}
        >
          <div
            className="relative max-w-4xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-white text-3xl font-bold z-50 hover:text-rose-400"
              onClick={() => setSelectedMedia(null)}
              aria-label="Close modal"
            >
              &times;
            </button>

            {selectedMedia.type === 'image' ? (
              <img
                src={selectedMedia.url}
                alt={selectedMedia.memoryTitle}
                className="max-w-full max-h-[80vh] rounded"
              />
            ) : (
              <video
                src={selectedMedia.url}
                controls
                autoPlay
                className="max-w-full max-h-[80vh] rounded bg-black"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
