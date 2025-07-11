import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Dashboard from './pages/Dashboard';
import AuthModal from './components/AuthModal';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authType, setAuthType] = useState('login');

  const handleAuthOpen = (type) => {
    setAuthType(type || 'login');
    setAuthModalOpen(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home onAuthOpen={handleAuthOpen} />} />
        <Route path="/services" element={<ServicesPage onAuthOpen={handleAuthOpen} />} />
        <Route path="/about" element={<AboutPage onAuthOpen={handleAuthOpen} />} />
        <Route path="/contact" element={<ContactPage onAuthOpen={handleAuthOpen} />} />
        
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
      
      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        type={authType}
      />
    </Router>
  );
}

export default App;