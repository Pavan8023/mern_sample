// src/components/ProtectedAdminRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedAdminRoute = () => {
  const isAuthenticated = localStorage.getItem('adminToken') === 'authenticated';

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin-login" replace />;
};

export default ProtectedAdminRoute;