
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { MemoryProvider } from './context/MemoryContext';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import MemoryView from './pages/Memory/MemoryView';
import MemoryCreate from './pages/Memory/MemoryCreate';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Gallery from './pages/Memory/MemoryGallery';
import ReminderModal from './components/ui/ReminderModal';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <ThemeProvider>
      <MemoryProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/memory/:id" element={<MemoryView />} />
              <Route path="/create" element={<MemoryCreate />} />
              <Route path="/edit/:id" element={<MemoryCreate />} />
              <Route path="/profile" element={<Profile />} />
              <Route path='/gallery' element={<Gallery/>}></Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
          <ReminderModal />
          <Chatbot />
        </Router>
      </MemoryProvider>
    </ThemeProvider>
  );
}

export default App;