import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, BookOpen } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled || !isHomePage 
          ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link 
            to="/" 
            className="flex items-center space-x-2"
          >
            <BookOpen className="h-8 w-8 text-amber-500" />
            <span className="text-xl md:text-2xl font-serif font-semibold text-slate-800 dark:text-white">
              ReLive
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/dashboard" 
              className="font-medium text-slate-600 hover:text-amber-500 dark:text-slate-200 dark:hover:text-amber-400 transition-colors"
            >
              Dashboard
            </Link>
            <Link 
              to="/create" 
              className="font-medium text-slate-600 hover:text-amber-500 dark:text-slate-200 dark:hover:text-amber-400 transition-colors"
            >
              Create Memory
            </Link>
            <Link 
              to="/profile" 
              className="font-medium text-slate-600 hover:text-amber-500 dark:text-slate-200 dark:hover:text-amber-400 transition-colors"
            >
              Profile
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-amber-400" />
              ) : (
                <Moon className="h-5 w-5 text-slate-600" />
              )}
            </button>
            {isHomePage && (
              <Link to="/dashboard">
                <Button variant="primary">Get Started</Button>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleTheme}
              className="p-2 mr-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-amber-400" />
              ) : (
                <Moon className="h-5 w-5 text-slate-600" />
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-slate-600 dark:text-slate-200" />
              ) : (
                <Menu className="h-6 w-6 text-slate-600 dark:text-slate-200" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 shadow-md">
          <div className="container mx-auto px-4 py-4 space-y-3">
            <Link
              to="/dashboard"
              className="block py-2 font-medium text-slate-600 hover:text-amber-500 dark:text-slate-200 dark:hover:text-amber-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>

            <Link
              to="/create"
              className="block py-2 font-medium text-slate-600 hover:text-amber-500 dark:text-slate-200 dark:hover:text-amber-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Create Memory
            </Link>
            
             <Link to="/gallery" className="block py-2 font-medium text-slate-600 hover:text-amber-500 dark:text-slate-200 dark:hover:text-amber-400">
                   Gallery
                   </Link>
    
            <Link
              to="/profile"
              className="block py-2 font-medium text-slate-600 hover:text-amber-500 dark:text-slate-200 dark:hover:text-amber-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Profile
            </Link>
            {isHomePage && (
              <Link 
                to="/dashboard" 
                className="block"
                onClick={() => setIsMenuOpen(false)}
              >
                <Button variant="primary" fullWidth>Get Started</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;