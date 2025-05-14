import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, BookOpen, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 shadow-inner">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-6 w-6 text-amber-500" />
              <span className="text-xl font-serif font-semibold text-slate-800 dark:text-white">
                MemoMuse
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 mb-4 max-w-md">
              Preserve your holiday, events  memories with my AI-powered  gallery journal. Capture moments, reflect on experiences, and revisit memories that matter.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-slate-500 hover:text-amber-500 dark:text-slate-400 dark:hover:text-amber-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-slate-500 hover:text-amber-500 dark:text-slate-400 dark:hover:text-amber-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
                App
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/dashboard" className="text-slate-600 hover:text-amber-500 dark:text-slate-300 dark:hover:text-amber-400 transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/create" className="text-slate-600 hover:text-amber-500 dark:text-slate-300 dark:hover:text-amber-400 transition-colors">
                    Create Memory
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className="text-slate-600 hover:text-amber-500 dark:text-slate-300 dark:hover:text-amber-400 transition-colors">
                    Profile
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
                Support
              </h3>
              {/* <ul className="space-y-2">
                <li>
                  <Link to="/help" className="text-slate-600 hover:text-amber-500 dark:text-slate-300 dark:hover:text-amber-400 transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-slate-600 hover:text-amber-500 dark:text-slate-300 dark:hover:text-amber-400 transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-slate-600 hover:text-amber-500 dark:text-slate-300 dark:hover:text-amber-400 transition-colors">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>  */}
            
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
                Company
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-slate-600 hover:text-amber-500 dark:text-slate-300 dark:hover:text-amber-400 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-slate-600 hover:text-amber-500 dark:text-slate-300 dark:hover:text-amber-400 transition-colors">
                    Contact
                  </Link>
                </li>
                {/* <li>
                  <Link to="/blog" className="text-slate-600 hover:text-amber-500 dark:text-slate-300 dark:hover:text-amber-400 transition-colors">
                    Blog
                  </Link>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-200 dark:border-slate-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            &copy; {new Date().getFullYear()} MemoMuse. All rights reserved.
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center mt-4 md:mt-0">
            Made with <Heart className="h-4 w-4 text-rose-500 mx-1" /> by Livingman-adeyemi
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;