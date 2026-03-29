import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import * as SecureStore from "expo-secure-store";

const secureStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return SecureStore.getItemAsync(name);
  },
  setItem: async (name: string, value: string): Promise<void> => {
    return SecureStore.setItemAsync(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    return SecureStore.deleteItemAsync(name);
  },
};

type HistoryStore = {
  history: string[];
  addToHistory: (item: string) => void;
  clearHistory: () => void;
};

export const useHistoryStore = create<HistoryStore>()(
  persist(
    (set) => ({
      history: [],
      addToHistory: (item: string) =>
        set((state) => {
          // Keep unique items, case insensitive checking but keep original case
          const lowerItem = item.toLowerCase();
          const existingIndex = state.history.findIndex((i) => i.toLowerCase() === lowerItem);
          
          if (existingIndex !== -1) {
            // Already exists, move to top (if you want recent at top, or just do nothing)
            return state;
          }
          
          // Add to beginning of history, keep maximum 100 items for performance
          const newHistory = [item, ...state.history].slice(0, 100);
          return { history: newHistory };
        }),
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: "grocery-item-history", // unique name
      storage: createJSONStorage(() => secureStorage),
    }
  )
);
