import { create } from 'zustand';

type AppState = {
  isLoggingOut: boolean;
  setIsLoggingOut: (isLoggingOut: boolean) => void;
};

export const useAppStore = create<AppState>()((set) => ({
  isLoggingOut: false,
  setIsLoggingOut: (isLoggingOut: boolean) => {
    set({ isLoggingOut });
  },
}));
