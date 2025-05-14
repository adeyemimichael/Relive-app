import React, { useState } from 'react';
import { mockUser } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';
import Button from '../components/ui/Button';
import { 
  User, Settings, BellRing, Moon, Sun, 
  Sparkles, LogOut, Camera, Save
} from 'lucide-react';

const Profile: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [profile, setProfile] = useState({
    name: mockUser.name,
    avatar: mockUser.avatar,
    aiEnabled: mockUser.preferences.aiEnabled,
    reminderFrequency: mockUser.preferences.reminderFrequency || 'daily',
  });
  const [isEditing, setIsEditing] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setProfile(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };
  
  const toggleAI = () => {
    setProfile(prev => ({
      ...prev,
      aiEnabled: !prev.aiEnabled
    }));
  };
  
  const handleSaveProfile = () => {
    // Would save to API in a real app
    setIsEditing(false);
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
                      className="absolute bottom-0 right-0 p-1.5 bg-amber-500 text-white rounded-full shadow-md hover:bg-amber-600 transition-colors"
                      aria-label="Change profile picture"
                    >
                      <Camera className="h-4 w-4" />
                    </button>
                  )}
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
                    <span className="font-medium text-slate-900 dark:text-white">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-slate-300">Photos</span>
                    <span className="font-medium text-slate-900 dark:text-white">36</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-slate-300">AI Reflections</span>
                    <span className="font-medium text-slate-900 dark:text-white">8</span>
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
              
              {/* Account Settings */}
              <div>
                <h3 className="font-medium text-slate-800 dark:text-slate-200 mb-4">
                  Account Settings
                </h3>
                
                <div className="space-y-4">
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-700">
                    <button className="w-full flex items-center justify-between text-left">
                      <div className="flex items-center">
                        <User className="h-5 w-5 text-slate-500 mr-3" />
                        <div>
                          <h4 className="font-medium text-slate-900 dark:text-white">
                            Account Information
                          </h4>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Update your email and password
                          </p>
                        </div>
                      </div>
                      <span className="text-amber-500">Edit</span>
                    </button>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-700">
                    <button className="w-full flex items-center justify-between text-left text-rose-500 dark:text-rose-400">
                      <div className="flex items-center">
                        <LogOut className="h-5 w-5 mr-3" />
                        <div>
                          <h4 className="font-medium">
                            Log Out
                          </h4>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Sign out of your account
                          </p>
                        </div>
                      </div>
                    </button>
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
              Download all your memories and photos in a convenient format.
            </p>
            <Button variant="outline">
              Export All Data
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;