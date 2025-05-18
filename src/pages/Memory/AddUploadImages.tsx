// import React, { useState } from 'react';
// import { useMemories } from '../../context/MemoryContext';

// const AddMemoryForm: React.FC = () => {
//   const { addMemory } = useMemories();
//   const [title, setTitle] = useState('');
//   const [files, setFiles] = useState<File[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFiles(Array.from(e.target.files));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);

//     if (!title.trim()) {
//       setError('Please enter a memory title.');
//       return;
//     }

//     if (files.length === 0) {
//       setError('Please select at least one image or video.');
//       return;
//     }

//     setLoading(true);
//     try {
//       await addMemory({
//         title: title.trim(),
//         images: files, // pass files, your context will convert to URLs
//       });

//       setTitle('');
//       setFiles([]);
//     } catch (err) {
//       setError('Failed to add memory. Try again.');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-xl mx-auto p-4 mb-10 bg-white dark:bg-gray-800 rounded shadow"
//     >
//       <h2 className="text-2xl font-semibold mb-4 dark:text-white">Add New Memory</h2>

//       {error && (
//         <p className="text-red-500 mb-4" role="alert">
//           {error}
//         </p>
//       )}

//       <label className="block mb-4">
//         <span className="text-gray-700 dark:text-gray-300">Memory Title</span>
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:text-white"
//           placeholder="Enter memory title"
//           required
//           disabled={loading}
//         />
//       </label>

//       <label className="block mb-6">
//         <span className="text-gray-700 dark:text-gray-300">Select Images or Videos</span>
//         <input
//           type="file"
//           multiple
//           accept="image/*,video/*"
//           onChange={handleFilesChange}
//           className="mt-1 block w-full text-gray-700 dark:text-gray-300"
//           disabled={loading}
//         />
//       </label>

//       <button
//         type="submit"
//         disabled={loading}
//         className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded disabled:opacity-50"
//       >
//         {loading ? 'Uploading...' : 'Add Memory'}
//       </button>
//     </form>
//   );
// };

// export default AddMemoryForm;
