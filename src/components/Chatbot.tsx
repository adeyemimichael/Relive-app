import React, { useState, useEffect, useRef } from 'react';
import { useMemories } from '../context/MemoryContext';
import { getAIRecommendation } from '../utils/genai';
import { Bot, X, Send } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  imageUrl?: string;
}

const Chatbot: React.FC = () => {
  const { memories } = useMemories();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Hi! I’m your ReLivee Travel Buddy. What’s your name?' },
  ]);
  const [input, setInput] = useState('');
  const [userName, setUserName] = useState<string | null>(localStorage.getItem('userName'));
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (userName) {
      localStorage.setItem('userName', userName);
    }
  }, [userName]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      if (!userName) {
        // First message is the user's name
        setUserName(input);
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: `Nice to meet you, ${input}! Ask me about places to visit!` },
        ]);
        return;
      }

      const response = await getAIRecommendation(input, memories, userName);
      setMessages((prev) => [...prev, response]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: `Sorry, ${userName || 'Traveler'}, something went wrong. Try again!` },
      ]);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-amber-500 text-white rounded-full p-3 shadow-lg hover:bg-amber-600 transition-colors"
          aria-label="Open chatbot"
        >
          <Bot className="h-6 w-6" />
        </button>
      )}

      {isOpen && (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-80 h-96 flex flex-col border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-center p-3 border-b border-slate-200 dark:border-slate-700">
            <h3 className="font-medium text-slate-900 dark:text-white">ReLivee Travel Buddy</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              aria-label="Close chatbot"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 p-3 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}
              >
                <span
                  className={`inline-block p-2 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-amber-500 text-white'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white'
                  }`}
                >
                  {msg.content}
                </span>
                {msg.imageUrl && msg.role === 'assistant' && (
                  <img
                    src={msg.imageUrl}
                    alt="Destination"
                    className="mt-2 rounded-lg max-w-full h-auto"
                  />
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-3 border-t border-slate-200 dark:border-slate-700 flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={userName ? 'Ask about places...' : 'Enter your name...'}
              className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-600 outline-none"
            />
            <button
              onClick={handleSend}
              className="ml-2 text-amber-500 hover:text-amber-600"
              aria-label="Send message"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;