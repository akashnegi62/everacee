/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '@/lib/api';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (data: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if (token && token !== "undefined" && token !== "null") {
        try {
          const res = await authApi.getMe();
          const userData = res.data?.data?.user || res.data?.user || res.data;
          if (userData) {
            setUser({
              ...userData,
              firstName: userData.firstName || userData.first_name,
              lastName: userData.lastName || userData.last_name,
            });
          } else {
            setUser(null);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
          }
        } catch (error) {
          console.error("Auth initialization failed", error);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          setUser(null);
        }
      } else {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setUser(null);
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (data: any) => {
    try {
      const res = await authApi.login(data);
      const payload = res.data?.data || res.data;
      const { accessToken, refreshToken, user: userData } = payload;
      
      if (!accessToken || !userData) {
        throw new Error("Invalid response from server");
      }

      localStorage.setItem('accessToken', accessToken);
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }
      setUser({
        ...userData,
        firstName: userData.firstName || userData.first_name,
        lastName: userData.lastName || userData.last_name,
      });
      router.push('/');
    } catch (error: any) {
      throw error.response?.data?.message || error.message || "Login failed";
    }
  };

  const register = async (data: any) => {
    try {
      await authApi.register(data);
      router.push('/login');
    } catch (error: any) {
      throw error.response?.data?.message || "Registration failed";
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
