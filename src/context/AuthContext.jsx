import React, { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = useCallback((user, pass) => {
    setUsername(user);
    setPassword(pass);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    setUsername('');
    setPassword('');
    setIsAuthenticated(false);
  }, []);

  const getAuthHeader = useCallback(() => {
    if (!username || !password) return null;
    const credentials = btoa(`${username}:${password}`);
    return `Basic ${credentials}`;
  }, [username, password]);

  const value = {
    isAuthenticated,
    username,
    password,
    login,
    logout,
    getAuthHeader,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
