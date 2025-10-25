import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../api/apiClient';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      verifyToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      await apiClient.post('/api/auth/verify');
      setIsAuthenticated(true);
    } catch (error) {
      localStorage.removeItem('token');
      delete apiClient.defaults.headers.common['Authorization'];
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (password) => {
    try {
      const response = await apiClient.post('/api/auth/login', { password });
      const { token } = response.data;

      localStorage.setItem('token', token);
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsAuthenticated(true);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete apiClient.defaults.headers.common['Authorization'];
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};