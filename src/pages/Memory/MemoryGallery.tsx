import React, { useState, useRef } from 'react';

type MediaType = 'image' | 'video';

interface MediaItem {
  id: string;
  url: string;
  type: MediaType;
  category: string;
}

const Gallery: React.FC = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [categoryInput, setCategoryInput] = useState('');
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const groupedMedia = mediaItems.reduce<Record<string, MediaItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !categoryInput.trim()) {
      alert('Please enter a category and select files.');
      return;
    }

    const newItems: MediaItem[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const url = URL.createObjectURL(file);

      let type: MediaType = 'image';
      if (file.type.startsWith('video/')) type = 'video';

      newItems.push({
        id: `${Date.now()}-${file.name}-${i}`,
        url,
        type,
        category: categoryInput.trim(),
      });
    }

    setMediaItems((prev) => [...prev, ...newItems]);
    setCategoryInput('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6">Media Gallery</h1>

      {/* Upload Section */}
      <div className="mb-8 flex flex-wrap items-center gap-4">
        <input
          type="text"
          placeholder="Category / Event name"
          value={categoryInput}
          onChange={(e) => setCategoryInput(e.target.value)}
          className="border rounded px-3 py-2 text-sm w-64"
        />

        <button
          onClick={handleUploadClick}
          className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition"
        >
          Upload Images/Videos
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

      {/* Gallery Section */}
      {Object.keys(groupedMedia).length === 0 && (
        <p className="text-gray-500">No media uploaded yet.</p>
      )}

      {Object.entries(groupedMedia).map(([category, items]) => (
        <div key={category} className="mb-12">
          <h2 className="text-xl font-semibold mb-4 border-b pb-1">{category}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {items.map(({ id, url, type }) => (
              <div
                key={id}
                className="relative rounded overflow-hidden shadow-md cursor-pointer"
                onClick={() => setSelectedMedia({ id, url, type, category })}
              >
                {type === 'image' ? (
                  <img
                    src={url}
                    alt={category}
                    className="w-full h-48 object-cover rounded"
                  />
                ) : (
                  <video
                    src={url}
                    className="w-full h-48 rounded bg-black"
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

      {/* Modal */}
      {selectedMedia && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4"
          onClick={() => setSelectedMedia(null)}
        >
          <div
            className="relative max-w-4xl max-h-full"
            onClick={(e) => e.stopPropagation()} // prevent closing modal on media click
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
                alt={selectedMedia.category}
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
