import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { STORAGE_KEYS, getItem, setItem, removeItem } from '@/utils/localStorage';
import { MOCK_CREDENTIALS } from '@/utils/constants';

interface User {
  username: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authStatus = getItem<boolean>(STORAGE_KEYS.AUTH, false);
    const savedUser = getItem<User | null>(STORAGE_KEYS.USER, null);
    
    if (authStatus && savedUser) {
      setIsAuthenticated(true);
      setUser(savedUser);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback((username: string, password: string): boolean => {
    if (username === MOCK_CREDENTIALS.username && password === MOCK_CREDENTIALS.password) {
      const userData = { username };
      setIsAuthenticated(true);
      setUser(userData);
      setItem(STORAGE_KEYS.AUTH, true);
      setItem(STORAGE_KEYS.USER, userData);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUser(null);
    removeItem(STORAGE_KEYS.AUTH);
    removeItem(STORAGE_KEYS.USER);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
