// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('loggedInUser');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
