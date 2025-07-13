import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import ProtectedRoute from './components/ProtectedRoute';
import LoginForm from './components/LoginForm';

import Chatbot from './pages/Chatbot';

// Pages
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import Programs from './pages/Programs';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Dashboard from './pages/Dashboard';

function App() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

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
            <Route path="/" element={<Home onAuthOpen={handleAuthOpen} />} />
            <Route path="/services" element={<ServicesPage onAuthOpen={handleAuthOpen} />} />
            <Route path="/programs" element={<Programs onAuthOpen={handleAuthOpen} />} />
            <Route path="/events" element={<Events onAuthOpen={handleAuthOpen} />} />
            <Route path="/gallery" element={<Gallery onAuthOpen={handleAuthOpen} />} />
            <Route path="/about" element={<AboutPage onAuthOpen={handleAuthOpen} />} />
            <Route path="/contact" element={<ContactPage onAuthOpen={handleAuthOpen} />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </main>
        <Footer />
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;