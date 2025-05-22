import React, { useState } from 'react';
import { Copy, Share2 } from 'lucide-react';
import Button from './Button';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareUrl: string;
  title: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, shareUrl, title }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: `Check out my memory: ${title}`,
          url: shareUrl,
        });
        onClose();
        return;
      } catch (err) {
        console.error('Web Share API failed:', err);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 max-w-md w-full shadow-xl">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
          Share this memory
        </h2>
        <p className="text-slate-600 dark:text-slate-300 mb-4">
          Copy the link below to share this memory with others:
        </p>
        <div className="flex items-center mb-6">
          <input
            type="text"
            value={shareUrl}
            readOnly
            className="flex-1 p-2 bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-l-md text-sm text-slate-700 dark:text-slate-300 focus:outline-none"
          />
          <button
            onClick={handleCopyLink}
            className={`p-2 rounded-r-md transition-colors ${
              isCopied
                ? 'bg-green-500 text-white'
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'
            }`}
            aria-label="Copy link"
          >
            <Copy className="h-5 w-5" />
          </button>
        </div>
        {isCopied && (
          <p className="text-green-600 dark:text-green-400 text-sm mb-4">
            Link copied to clipboard!
          </p>
        )}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleShare}
            icon={<Share2 className="h-5 w-5" />}
          >
            Share via Device
          </Button>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;