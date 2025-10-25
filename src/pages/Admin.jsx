import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Login from '../components/Dashboard/Login';
import AdminDashboard from '../components/Dashboard/AdminDashboard';

const Admin = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {isAuthenticated ? <AdminDashboard /> : <Login />}
    </div>
  );
};

export default Admin;