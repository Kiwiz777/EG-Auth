// src/store/auth.ts
import { create } from "zustand";
import * as authApi from "../api/auth"; // adjust if your path differs

type User = {
  id: string;
  email: string;
  name: string;
};

type AuthState = {
  user: User | null;
  setUser: (u: User) => void;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),

  logout: async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error("Logout API failed:", error);
    } finally {
      set({ user: null });
    }
  },
}));
