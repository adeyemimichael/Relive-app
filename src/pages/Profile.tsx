import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMemories } from '../context/MemoryContext';
import { useTheme } from '../context/ThemeContext';
import Button from '../components/ui/Button';
import ReminderModal from '../components/ui/ReminderModal';
import {
  User,
  Settings,
  BellRing,
  Moon,
  Sun,
  Sparkles,
  LogOut,
  Camera,
  Save,
  Download,
} from 'lucide-react';

const Profile: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, memories, updateUser, getStats } = useMemories();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: user?.name || 'User',
    avatar: user?.avatar || 'https://via.placeholder.com/150',
    aiEnabled: user?.preferences.aiEnabled ?? true,
    reminderFrequency: user?.preferences.reminderFrequency || 'daily',
  });
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const stats = getStats();

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setProfile((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const base64 = await toBase64(file);
      setProfile((prev) => ({ ...prev, avatar: base64 }));
    } else {
      alert('Please select a valid image file.');
    }
  };

  const toggleAI = () => {
    setProfile((prev) => ({
      ...prev,
      aiEnabled: !prev.aiEnabled,
    }));
  };

  const handleSaveProfile = async () => {
    await updateUser({
      name: profile.name,
      avatar: profile.avatar,
      preferences: {
        aiEnabled: profile.aiEnabled,
        reminderFrequency: profile.reminderFrequency,
      },
    });
    setIsEditing(false);
  };

  const handleExportData = () => {
    const data = {
      memories,
      user: {
        name: profile.name,
        avatar: profile.avatar,
        preferences: {
          aiEnabled: profile.aiEnabled,
          reminderFrequency: profile.reminderFrequency,
        },
      },
    };
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `memories_export_${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLogout = () => {
    // Placeholder: Clear auth token and redirect
    localStorage.removeItem('authToken');
    navigate('/login'); // Adjust to your login route
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="font-serif text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white mb-6">
        Your Profile
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - Profile Overview */}
        <div className="md:col-span-1">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden border border-slate-200 dark:border-slate-700">
            <div className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-28 h-28 rounded-full object-cover border-4 border-white dark:border-slate-700 shadow-md"
                  />
                  {isEditing && (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-0 right-0 p-1.5 bg-amber-500 text-white rounded-full shadow-md hover:bg-amber-600 transition-colors"
                      aria-label="Change profile picture"
                    >
                      <Camera className="h-4 w-4" />
                    </button>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>

                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleInputChange}
                    className="text-xl font-semibold text-slate-900 dark:text-white text-center mb-2 px-4 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-600 outline-none transition"
                  />
                ) : (
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    {profile.name}
                  </h2>
                )}

                <div className="text-slate-500 dark:text-slate-400 text-sm">
                  Member since July 2025
                </div>

                <div className="mt-6 w-full">
                  {isEditing ? (
                    <Button
                      variant="primary"
                      fullWidth
                      onClick={handleSaveProfile}
                      icon={<Save className="h-4 w-4" />}
                    >
                      Save Profile
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      fullWidth
                      onClick={() => setIsEditing(true)}
                      icon={<Settings className="h-4 w-4" />}
                    >
                      Edit Profile
                    </Button>
                  )}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                <h3 className="font-medium text-slate-900 dark:text-white mb-4">
                  Account Statistics
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-slate-300">Memories</span>
                    <span className="font-medium text-slate-900 dark:text-white">{stats.memories}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-slate-300">Photos</span>
                    <span className="font-medium text-slate-900 dark:text-white">{stats.photos}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-slate-300">AI Reflections</span>
                    <span className="font-medium text-slate-900 dark:text-white">{stats.aiReflections}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Settings */}
        <div className="md:col-span-2">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden border border-slate-200 dark:border-slate-700">
            <div className="p-6">
              <h2 className="font-serif text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center">
                <Settings className="h-5 w-5 mr-2 text-amber-500" />
                Settings
              </h2>

              {/* App Preferences */}
              <div className="mb-8">
                <h3 className="font-medium text-slate-800 dark:text-slate-200 mb-4">
                  App Preferences
                </h3>

                <div className="space-y-4">
                  {/* Theme Toggle */}
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-700">
                    <div className="flex items-center">
                      {theme === 'dark' ? (
                        <Moon className="h-5 w-5 text-blue-500 mr-3" />
                      ) : (
                        <Sun className="h-5 w-5 text-amber-500 mr-3" />
                      )}
                      <div>
                        <h4 className="font-medium text-slate-900 dark:text-white">
                          Theme
                        </h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {theme === 'dark' ? 'Dark mode' : 'Light mode'} is currently active
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={toggleTheme}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        theme === 'dark' ? 'bg-blue-600' : 'bg-amber-500'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* AI Features */}
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-700">
                    <div className="flex items-center">
                      <Sparkles className="h-5 w-5 text-amber-500 mr-3" />
                      <div>
                        <h4 className="font-medium text-slate-900 dark:text-white">
                          AI Features
                        </h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Enable AI-powered reflections for your memories
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={toggleAI}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        profile.aiEnabled ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          profile.aiEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Reminder Frequency */}
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-700">
                    <div className="flex items-center">
                      <BellRing className="h-5 w-5 text-amber-500 mr-3" />
                      <div>
                        <h4 className="font-medium text-slate-900 dark:text-white">
                          Journal Reminders
                        </h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          How often would you like to be reminded to journal?
                        </p>
                      </div>
                    </div>
                    <select
                      name="reminderFrequency"
                      value={profile.reminderFrequency}
                      onChange={handleInputChange}
                      className="rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white py-1 px-3 focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-600 outline-none text-sm"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                </div>
              </div>

              
              
            </div>
          </div>

          <div className="mt-6 bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="font-serif text-xl font-semibold text-slate-900 dark:text-white mb-4">
              Export Your Data
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Download all your memories and photos in a convenient JSON format.
            </p>
            <Button
              variant="outline"
              onClick={handleExportData}
              icon={<Download className="h-4 w-4" />}
            >
              Export All Data
            </Button>
          </div>
        </div>
      </div>

      <ReminderModal />
    </div>
  );
};

export default Profile;