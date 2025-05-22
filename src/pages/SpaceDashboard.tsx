import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMemories } from '../context/MemoryContext';
import Button from '../components/ui/Button';
import { Users, Plus, ArrowRight } from 'lucide-react';

const SpaceDashboard: React.FC = () => {
  const { spaces, spaceMembers, user, createSpace, joinSpace } = useMemories();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [inviteUserId, setInviteUserId] = useState('');
  const [inviteRole, setInviteRole] = useState<'editor' | 'viewer'>('editor');

  const handleCreateSpace = async () => {
    if (!title.trim()) {
      alert('Please enter a title.');
      return;
    }
    await createSpace(title, description);
    setTitle('');
    setDescription('');
  };

  const handleInvite = async (spaceId: string) => {
    if (!inviteUserId.trim()) {
      alert('Please enter a user ID.');
      return;
    }
    await joinSpace(spaceId, inviteUserId, inviteRole);
    setInviteUserId('');
  };

  const userSpaces = spaces.filter((space) =>
    spaceMembers.some((member) => member.spaceId === space.id && member.userId === user?.id)
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="font-serif text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white mb-6">
        Collaborative Memory Spaces
      </h1>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 mb-8 border border-slate-200 dark:border-slate-700">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
          Create a New Space
        </h2>
        <input
          type="text"
          placeholder="Space Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white mb-4"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white mb-4 resize-none h-24"
        />
        <Button variant="primary" onClick={handleCreateSpace} icon={<Plus className="h-4 w-4" />}>
          Create Space
        </Button>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Your Spaces</h2>
        {userSpaces.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400">No spaces yet. Create one above!</p>
        ) : (
          <div className="space-y-4">
            {userSpaces.map((space) => (
              <div
                key={space.id}
                className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-700"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-slate-900 dark:text-white">{space.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{space.description}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Members: {spaceMembers.filter((m) => m.spaceId === space.id).length}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/space/${space.id}`)}
                    icon={<ArrowRight className="h-4 w-4" />}
                  >
                    View
                  </Button>
                </div>
                {space.ownerId === user?.id && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-2">
                      Invite Member
                    </h4>
                    <div className="flex space-x-3">
                      <input
                        type="text"
                        placeholder="User ID"
                        value={inviteUserId}
                        onChange={(e) => setInviteUserId(e.target.value)}
                        className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                      />
                      <select
                        value={inviteRole}
                        onChange={(e) => setInviteRole(e.target.value as 'editor' | 'viewer')}
                        className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                      >
                        <option value="editor">Editor</option>
                        <option value="viewer">Viewer</option>
                      </select>
                      <Button
                        variant="primary"
                        onClick={() => handleInvite(space.id)}
                        icon={<Users className="h-4 w-4" />}
                      >
                        Invite
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SpaceDashboard;