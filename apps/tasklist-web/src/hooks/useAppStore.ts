import { create } from 'zustand';

type AppState = {
  isLoggingOut: boolean;
  setIsLoggingOut: (isLoggingOut: boolean) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
};

export const useAppStore = create<AppState>()((set) => ({
  isLoggingOut: false,
  setIsLoggingOut: (isLoggingOut: boolean) => {
    set({ isLoggingOut });
  },
  isSidebarOpen: false,
  setIsSidebarOpen: (isSidebarOpen: boolean) => {
    set({ isSidebarOpen });
  },
}));
