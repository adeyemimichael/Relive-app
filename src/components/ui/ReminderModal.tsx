import React, { useState, useEffect } from 'react';
import { useMemories } from '../../context/MemoryContext';
import Button from '../../components/ui/Button';
import { X, Plus, Image as ImageIcon } from 'lucide-react';

const prompts = [
  { text: 'What made you smile today?', emotion: 'joy' },
  { text: 'Capture a moment of gratitude.', emotion: 'gratitude' },
  { text: 'What challenged you today?', emotion: 'reflective' },
  { text: 'Describe a moment of calm.', emotion: 'peace' },
  { text: 'What inspired you recently?', emotion: 'inspired' },
];

const ReminderModal: React.FC = () => {
  const { user, addMemory, shouldShowReminder, markReminderShown, snoozeReminder } = useMemories();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [prompt, setPrompt] = useState(prompts[0]);

  useEffect(() => {
    if (shouldShowReminder()) {
      setIsOpen(true);
      setPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
    }
  }, [shouldShowReminder]);

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleAddMemory = async () => {
    if (!title.trim()) {
      alert('Please enter a title.');
      return;
    }
    const base64Images = await Promise.all(images.map(toBase64));
    await addMemory({
      title,
      content,
      images: base64Images,
      emotionTags: [prompt.emotion],
      likes: 0,
      isLikedByUser: false,
    });
    setTitle('');
    setContent('');
    setImages([]);
    setIsOpen(false);
    await markReminderShown();
  };

  const handleSnooze = async () => {
    const now = new Date();
    let snoozeUntil: Date;
    switch (user?.preferences.reminderFrequency) {
      case 'daily':
        snoozeUntil = new Date(now.setHours(now.getHours() + 24));
        break;
      case 'weekly':
        snoozeUntil = new Date(now.setDate(now.getDate() + 7));
        break;
      case 'monthly':
        snoozeUntil = new Date(now.setMonth(now.getMonth() + 1));
        break;
      default:
        snoozeUntil = now;
    }
    await snoozeReminder(snoozeUntil.toISOString());
    setIsOpen(false);
  };

  const handleDismiss = async () => {
    setIsOpen(false);
    await markReminderShown();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl max-w-md w-full p-6 animate-slide-up">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-serif font-semibold text-slate-900 dark:text-white">
            Time to Journal!
          </h2>
          <button
            onClick={handleDismiss}
            className="text-slate-500 hover:text-rose-500 dark:text-slate-400 dark:hover:text-rose-400"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="text-slate-600 dark:text-slate-300 mb-4 italic">
          {prompt.text}
        </p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Memory Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none"
          />
          <textarea
            placeholder="Describe your moment..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none resize-none h-24"
          />
          <div>
            <label className="flex items-center text-slate-600 dark:text-slate-300 cursor-pointer">
              <ImageIcon className="h-5 w-5 mr-2" />
              Add Images
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            {images.length > 0 && (
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {images.length} image(s) selected
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 flex space-x-3 justify-end">
          <Button variant="outline" onClick={handleSnooze}>
            Snooze
          </Button>
          <Button
            variant="primary"
            onClick={handleAddMemory}
            icon={<Plus className="h-4 w-4" />}
          >
            Add Memory
          </Button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ReminderModal;