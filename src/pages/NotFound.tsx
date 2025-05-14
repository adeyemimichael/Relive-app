import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFound: React.FC = () => {
  return (
    <div className="max-w-md mx-auto text-center py-12">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden border border-slate-200 dark:border-slate-700 p-8">
        <div className="text-amber-500 mb-6">
          <Search className="h-16 w-16 mx-auto" />
        </div>
        
        <h1 className="font-serif text-3xl font-semibold text-slate-900 dark:text-white mb-4">
          Page Not Found
        </h1>
        
        <p className="text-slate-600 dark:text-slate-300 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 justify-center">
          <Link to="/">
            <Button 
              variant="primary" 
              icon={<Home className="h-5 w-5" />}
            >
              Go Home
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="outline">
              View Memories
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;