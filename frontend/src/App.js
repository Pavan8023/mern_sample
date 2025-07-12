// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import Programs from './pages/Programs'; // Add this
import Events from './pages/Events'; // Add this
import Gallery from './pages/Gallery'; // Add this
import AboutPage from './pages/AboutPage'; // Add this
import ContactPage from './pages/ContactPage';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';

function App() {
  const [authModalOpen, setAuthModalOpen] = React.useState(false);
  const [authMode, setAuthMode] = React.useState('signup'); // 'signup' or 'login'

  const handleAuthOpen = (mode) => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar onAuthOpen={handleAuthOpen} />
        <AuthModal 
          isOpen={authModalOpen} 
          onClose={() => setAuthModalOpen(false)} 
          mode={authMode} 
          setMode={setAuthMode}
        />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServicesPage />} />
            {/* Add these new routes */}
            <Route path="/programs" element={<Programs />} />
            <Route path="/events" element={<Events />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;