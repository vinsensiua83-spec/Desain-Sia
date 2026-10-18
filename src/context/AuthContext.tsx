import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { dbManager } from '../database/db';

interface AuthContextType {
  currentUser: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (nimOrEmail: string, passwordAttempt: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  register: (data: Partial<User> & { nim: string; password: string; nama: string }) => Promise<{ success: boolean; error?: string }>;
  updatePassword: (oldPass: string, newPass: string) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (updates: Partial<User>) => Promise<{ success: boolean; error?: string }>;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshUser = () => {
    const session = dbManager.getSession();
    setCurrentUser(session);
  };

  useEffect(() => {
    // Check existing stored session on startup
    const existing = dbManager.getSession();
    setCurrentUser(existing);
    setIsLoading(false);

    // Subscribe to DB updates
    const unsubscribe = dbManager.subscribe(() => {
      refreshUser();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const login = async (nimOrEmail: string, passwordAttempt: string) => {
    try {
      const user = dbManager.authenticateUser(nimOrEmail, passwordAttempt);
      if (user) {
        setCurrentUser(user);
        return { success: true };
      }
      return { success: false, error: 'NIM / Username atau Password tidak sesuai!' };
    } catch (e: any) {
      return { success: false, error: e.message || 'Terjadi kesalahan saat masuk' };
    }
  };

  const logout = () => {
    dbManager.clearSession();
    setCurrentUser(null);
  };

  const register = async (data: Partial<User> & { nim: string; password: string; nama: string }) => {
    try {
      const newUser = dbManager.registerUser(data);
      setCurrentUser(newUser);
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message || 'Gagal mendaftar akun mahasiswa baru' };
    }
  };

  const updatePassword = async (oldPass: string, newPass: string) => {
    if (!currentUser) return { success: false, error: 'Sesi login tidak aktif' };
    try {
      dbManager.updatePassword(currentUser.id, oldPass, newPass);
      refreshUser();
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message || 'Gagal memperbarui password' };
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!currentUser) return { success: false, error: 'Sesi login tidak aktif' };
    try {
      const updated = dbManager.updateBiodata(currentUser.id, updates);
      setCurrentUser(updated);
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message || 'Gagal menyimpan biodata' };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoggedIn: !!currentUser,
        isLoading,
        login,
        logout,
        register,
        updatePassword,
        updateProfile,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
