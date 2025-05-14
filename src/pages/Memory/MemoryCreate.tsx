import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { 
  ImagePlus, Users, MapPin, Calendar, 
  Tag, Sparkles, XCircle, ArrowLeft
} from 'lucide-react';
import { useMemories } from '../../context/MemoryContext';
import Button from '../../components/ui/Button';
import { Memory, EmotionTag } from '../../types';

interface FormData {
  title: string;
  content: string;
  images: string[];
  location: string;
  people: string[];
  emotionTags: EmotionTag[];
}

const MemoryCreate: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { addMemory, getMemoryById, updateMemory } = useMemories();
  const isEditMode = !!id;
  
  const initialFormState: FormData = {
    title: '',
    content: '',
    images: [''],
    location: '',
    people: [''],
    emotionTags: [],
  };
  
  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [aiSuggestionLoading, setAiSuggestionLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [imageInputError, setImageInputError] = useState<string | null>(null);
  
  const emotionOptions: EmotionTag[] = [
    'joy', 'nostalgia', 'tranquility', 'excitement', 
    'wonder', 'gratitude', 'love', 'adventure'
  ];
  
  // Load memory data if in edit mode
  useEffect(() => {
    if (isEditMode && id) {
      const memory = getMemoryById(id);
      if (memory) {
        const { title, content, images, location, people, emotionTags } = memory;
        setFormData({
          title,
          content,
          images: [...images, ''],
          location: location || '',
          people: people?.length ? [...people, ''] : [''],
          emotionTags: emotionTags || [],
        });
        
        if (memory.aiGenerated) {
          setAiSuggestion(memory.aiGenerated);
        }
      }
    }
  }, [isEditMode, id, getMemoryById]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleImageChange = (index: number, value: string) => {
    setImageInputError(null);
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData(prev => ({ ...prev, images: newImages }));
    
    // Add new input field if last field has content
    if (index === formData.images.length - 1 && value !== '') {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, '']
      }));
    }
  };
  
  const removeImage = (index: number) => {
    if (formData.images.length <= 1) return;
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, images: newImages }));
  };
  
  const handlePersonChange = (index: number, value: string) => {
    const newPeople = [...formData.people];
    newPeople[index] = value;
    setFormData(prev => ({ ...prev, people: newPeople }));
    
    // Add new input field if last field has content
    if (index === formData.people.length - 1 && value !== '') {
      setFormData(prev => ({
        ...prev,
        people: [...prev.people, '']
      }));
    }
  };
  
  const removePerson = (index: number) => {
    if (formData.people.length <= 1) return;
    const newPeople = formData.people.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, people: newPeople }));
  };
  
  const toggleEmotionTag = (emotion: EmotionTag) => {
    setFormData(prev => {
      if (prev.emotionTags.includes(emotion)) {
        return {
          ...prev,
          emotionTags: prev.emotionTags.filter(tag => tag !== emotion)
        };
      } else {
        return {
          ...prev,
          emotionTags: [...prev.emotionTags, emotion]
        };
      }
    });
  };
  
  const generateAISuggestion = () => {
    setAiSuggestionLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const suggestions = [
        "This moment seems to capture a profound sense of joy. The way you've described it suggests a deep appreciation for life's simple pleasures.",
        "There's a beautiful nostalgia in this memory. It appears to connect you with your past while creating something meaningful for your future.",
        "What stands out in this memory is the sense of wonder and discovery. These experiences seem to be expanding your perspective in meaningful ways.",
        "This memory reflects a moment of genuine connection. The people involved clearly have a special place in your emotional landscape."
      ];
      
      const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
      setAiSuggestion(randomSuggestion);
      setAiSuggestionLoading(false);
    }, 1500);
  };
  
  const validateForm = (): boolean => {
    // Validate required fields
    if (!formData.title.trim()) {
      alert('Please enter a title for your memory');
      return false;
    }
    
    if (!formData.content.trim()) {
      alert('Please enter some content for your memory');
      return false;
    }
    
    // Validate images - at least one valid image required
    const validImages = formData.images.filter(img => img.trim() !== '');
    if (validImages.length === 0) {
      setImageInputError('Please add at least one image URL');
      return false;
    }
    
    // Validate at least one emotion tag
    if (formData.emotionTags.length === 0) {
      alert('Please select at least one emotion tag');
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Clean up the data
    const cleanedData = {
      title: formData.title.trim(),
      content: formData.content.trim(),
      images: formData.images.filter(img => img.trim() !== ''),
      location: formData.location.trim() || undefined,
      people: formData.people.filter(person => person.trim() !== '') || undefined,
      emotionTags: formData.emotionTags,
      aiGenerated: aiSuggestion || undefined
    };
    
    if (isEditMode && id) {
      updateMemory(id, cleanedData);
    } else {
      addMemory(cleanedData);
    }
    
    navigate('/dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <Link 
          to="/dashboard" 
          className="inline-flex items-center text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-500 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden border border-slate-200 dark:border-slate-700 p-6 md:p-8">
        <h1 className="font-serif text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white mb-6">
          {isEditMode ? 'Edit Memory' : 'Create New Memory'}
        </h1>
        
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-6">
            <label 
              htmlFor="title" 
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Give your memory a title"
              className="w-full px-4 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-600 outline-none transition"
              required
            />
          </div>
          
          {/* Content */}
          <div className="mb-6">
            <label 
              htmlFor="content" 
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
            >
              Memory Details
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Write about this memory..."
              rows={6}
              className="w-full px-4 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-600 outline-none transition"
              required
            />
          </div>
          
          {/* AI Suggestion */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                AI Reflection
              </label>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={generateAISuggestion}
                disabled={formData.content.length < 10 || aiSuggestionLoading}
                icon={<Sparkles className="h-4 w-4" />}
              >
                {aiSuggestionLoading ? 'Generating...' : 'Generate'}
              </Button>
            </div>
            
            {aiSuggestion ? (
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-800/50">
                <p className="text-blue-700 dark:text-blue-300 italic">
                  {aiSuggestion}
                </p>
              </div>
            ) : (
              <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 border border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 text-center">
                <Sparkles className="h-5 w-5 mx-auto mb-2" />
                <p className="text-sm">
                  {formData.content.length < 10 
                    ? 'Write more about your memory to generate an AI reflection'
                    : 'Click "Generate" to get an AI-powered reflection on your memory'}
                </p>
              </div>
            )}
          </div>
          
          {/* Images */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <div className="flex items-center">
                <ImagePlus className="h-4 w-4 mr-2" />
                Images
              </div>
            </label>
            {formData.images.map((image, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={image}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  placeholder="Enter image URL"
                  className={`flex-grow px-4 py-2 rounded-md border ${
                    imageInputError && index === 0 && image === '' 
                      ? 'border-rose-500 dark:border-rose-500' 
                      : 'border-slate-300 dark:border-slate-600'
                  } bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-600 outline-none transition`}
                />
                {index > 0 || formData.images.length > 1 ? (
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="ml-2 p-2 text-slate-400 hover:text-rose-500 dark:text-slate-500 dark:hover:text-rose-400 transition-colors"
                  >
                    <XCircle className="h-5 w-5" />
                  </button>
                ) : null}
              </div>
            ))}
            {imageInputError && (
              <p className="text-rose-500 text-sm mt-1">{imageInputError}</p>
            )}
          </div>
          
          {/* Location */}
          <div className="mb-6">
            <label 
              htmlFor="location" 
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
            >
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                Location
              </div>
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Where did this memory take place?"
              className="w-full px-4 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-600 outline-none transition"
            />
          </div>
          
          {/* People */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                People
              </div>
            </label>
            {formData.people.map((person, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={person}
                  onChange={(e) => handlePersonChange(index, e.target.value)}
                  placeholder="Who was with you?"
                  className="flex-grow px-4 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-600 outline-none transition"
                />
                {index > 0 || formData.people.length > 1 ? (
                  <button
                    type="button"
                    onClick={() => removePerson(index)}
                    className="ml-2 p-2 text-slate-400 hover:text-rose-500 dark:text-slate-500 dark:hover:text-rose-400 transition-colors"
                  >
                    <XCircle className="h-5 w-5" />
                  </button>
                ) : null}
              </div>
            ))}
          </div>
          
          {/* Emotion Tags */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <div className="flex items-center">
                <Tag className="h-4 w-4 mr-2" />
                Emotion Tags
              </div>
            </label>
            <div className="flex flex-wrap gap-2">
              {emotionOptions.map(emotion => (
                <button
                  key={emotion}
                  type="button"
                  onClick={() => toggleEmotionTag(emotion)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    formData.emotionTags.includes(emotion)
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 ring-2 ring-amber-500 dark:ring-amber-600'
                      : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  {emotion.charAt(0).toUpperCase() + emotion.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-end">
            <Button 
              type="submit" 
              variant="primary" 
              size="lg"
            >
              {isEditMode ? 'Update Memory' : 'Save Memory'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MemoryCreate;