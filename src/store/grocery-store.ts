import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type GroceryCategory = "Produce" | "Dairy" | "Bakery" | "Pantry" | "Snacks";
export type GroceryPriority = "low" | "medium" | "high";

export type GroceryItem = {
  id: string;
  name: string;
  category: GroceryCategory;
  quantity: number;
  purchased: boolean;
  priority: GroceryPriority;
};

export type CreateItemInput = {
  name: string;
  category: GroceryCategory;
  quantity: number;
  priority: GroceryPriority;
};

const STORAGE_KEY = "grocify_items";

// Persist items to AsyncStorage
const persistItems = async (items: GroceryItem[]) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.warn("Failed to persist items:", e);
  }
};

// Load items from AsyncStorage
const loadPersistedItems = async (): Promise<GroceryItem[]> => {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as GroceryItem[];
  } catch (e) {
    console.warn("Failed to load persisted items:", e);
  }
  return [];
};

export type GroceryStore = {
  items: GroceryItem[];
  isLoading: boolean;
  error: string | null;
  loadItems: () => Promise<void>;
  addItem: (input: CreateItemInput) => Promise<GroceryItem | void>;
  addBulkItems: (inputs: CreateItemInput[]) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  togglePurchased: (id: string) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  clearPurchased: () => Promise<void>;
};

export const useGroceryStore = create<GroceryStore>((set, get) => ({
  items: [],
  isLoading: false,
  error: null,

  loadItems: async () => {
    set({ isLoading: true, error: null });
    try {
      const items = await loadPersistedItems();
      set({ items });
    } catch (error: any) {
      console.warn("Error loading items:", error);
      set({ error: error.message || "Failed to load items" });
    } finally {
      set({ isLoading: false });
    }
  },

  addItem: async (input) => {
    set({ error: null });
    const newItem: GroceryItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      name: input.name,
      category: input.category,
      quantity: Math.max(1, input.quantity),
      purchased: false,
      priority: input.priority,
    };

    const updatedItems = [newItem, ...get().items];
    set({ items: updatedItems });
    await persistItems(updatedItems);
    return newItem;
  },

  addBulkItems: async (inputs) => {
    set({ error: null });
    const newItems: GroceryItem[] = inputs.map((input, i) => ({
      id: `item-${Date.now()}-${i}-${Math.random().toString(36).substring(2, 9)}`,
      name: input.name,
      category: input.category,
      quantity: Math.max(1, input.quantity),
      purchased: false,
      priority: input.priority,
    }));

    const updatedItems = [...newItems, ...get().items];
    set({ items: updatedItems });
    await persistItems(updatedItems);
  },

  updateQuantity: async (id, quantity) => {
    const nextQuantity = Math.max(1, quantity);
    set({ error: null });
    const updatedItems = get().items.map((item) =>
      item.id === id ? { ...item, quantity: nextQuantity } : item
    );
    set({ items: updatedItems });
    await persistItems(updatedItems);
  },

  togglePurchased: async (id) => {
    const currentItem = get().items.find((item) => item.id === id);
    if (!currentItem) return;
    set({ error: null });
    const updatedItems = get().items.map((item) =>
      item.id === id ? { ...item, purchased: !item.purchased } : item
    );
    set({ items: updatedItems });
    await persistItems(updatedItems);
  },

  removeItem: async (id) => {
    set({ error: null });
    const updatedItems = get().items.filter((item) => item.id !== id);
    set({ items: updatedItems });
    await persistItems(updatedItems);
  },

  clearPurchased: async () => {
    set({ error: null });
    const updatedItems = get().items.filter((item) => !item.purchased);
    set({ items: updatedItems });
    await persistItems(updatedItems);
  },
}));
