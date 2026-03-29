import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const secureStorage = {
  getItem: async (name: string): Promise<string | null> => {
    if (Platform.OS === "web") return localStorage.getItem(name);
    return SecureStore.getItemAsync(name);
  },
  setItem: async (name: string, value: string): Promise<void> => {
    if (Platform.OS === "web") return localStorage.setItem(name, value);
    return SecureStore.setItemAsync(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    if (Platform.OS === "web") return localStorage.removeItem(name);
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
