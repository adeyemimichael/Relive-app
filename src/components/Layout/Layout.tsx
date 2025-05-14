import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-amber-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      <Header />
      <main className={`flex-grow ${isHomePage ? '' : 'container mx-auto px-4 py-6 md:py-8'}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;