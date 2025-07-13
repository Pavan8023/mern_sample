// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import ProtectedRoute from './components/ProtectedRoute';
import LoginForm from './components/LoginForm';
import AdminAccess from './components/AdminAccess';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import PageEditor from './pages/admin/PageEditor';
import UsersManagement from './pages/admin/UsersManagement';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import Chatbot from './pages/Chatbot';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import Programs from './pages/Programs';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Dashboard from './pages/Dashboard';

// Wrapper component for AdminAccess
const AdminAccessWrapper = () => {
  const navigate = useNavigate();
  return <AdminAccess navigate={navigate} />;
};

function App() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const handleAuthOpen = (mode) => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <div className="App">
      <Router>
        <div className="flex flex-col min-h-screen">
          <AdminAccessWrapper />
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
              <Route path="/login" element={<LoginForm switchToSignup={() => setAuthMode('signup')} />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              
              {/* Protected admin routes */}
              <Route element={<ProtectedAdminRoute />}>
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="edit/:pageName" element={<PageEditor />} />
                  <Route path="users" element={<UsersManagement />} />
                </Route>
              </Route>
              
              {/* Protected user routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
            </Routes>
          </main>
          <Footer />
          <Chatbot />
        </div>
      </Router>
    </div>
  );
}

export default App;