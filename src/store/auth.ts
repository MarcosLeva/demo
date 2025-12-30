
'use client';
import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  email: string | null;
  login: (email: string) => void;
  logout: () => void;
}

const getInitialAuthState = (): { isAuthenticated: boolean; email: string | null } => {
  if (typeof window === 'undefined') {
    return { isAuthenticated: false, email: null };
  }
  try {
    const email = localStorage.getItem('auth_email');
    if (email) {
      return { isAuthenticated: true, email };
    }
  } catch (error) {
    console.error("Could not access localStorage for auth state", error);
  }
  return { isAuthenticated: false, email: null };
};


export const useAuthStore = create<AuthState>((set) => ({
  ...getInitialAuthState(),
  login: (email) => {
    try {
      localStorage.setItem('auth_email', email);
    } catch (error) {
       console.error("Could not save auth state to localStorage", error);
    }
    set({ isAuthenticated: true, email });
  },
  logout: () => {
     try {
      localStorage.removeItem('auth_email');
    } catch (error) {
        console.error("Could not remove auth state from localStorage", error);
    }
    set({ isAuthenticated: false, email: null });
  },
}));
