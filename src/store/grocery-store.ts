import { create } from "zustand";

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

type ItemsResponse = { items: GroceryItem[] };
type ItemResponse = { item: GroceryItem };

export type GroceryStore = {
  items: GroceryItem[];
  offlineQueue: CreateItemInput[];
  isLoading: boolean;
  error: string | null;
  loadItems: () => Promise<void>;
  addItem: (input: CreateItemInput, isSync?: boolean) => Promise<GroceryItem | void>;
  syncOfflineItems: () => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  togglePurchased: (id: string) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  clearPurchased: () => Promise<void>;
};

// Helper function to safely parse API responses, preventing HTML crash bugs.
const safeFetchJson = async (res: Response) => {
  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    const text = await res.text();
    console.warn("API returned invalid JSON/HTML:", text.substring(0, 300));
    throw new Error(`Server returned an invalid response (not JSON). Status: ${res.status}. Check Metro terminal for errors.`);
  }
  return res.json();
};

export const useGroceryStore = create<GroceryStore>((set, get) => ({
  items: [],
  offlineQueue: [],
  isLoading: false,
  error: null,

  loadItems: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch("/api/items");
      const payload = (await safeFetchJson(res)) as ItemsResponse & { error?: string };

      if (!res.ok) throw new Error(payload.error || `Request failed (${res.status})`);
      set({ items: payload.items });
      
      // Auto-sync offline queue when we successfully connect!
      get().syncOfflineItems();
    } catch (error: any) {
      console.warn("Offline or error loading items:", error);
      set({ error: error.message || "Working offline" });
    } finally {
      set({ isLoading: false });
    }
  },

  syncOfflineItems: async () => {
    const queue = get().offlineQueue;
    if (!queue || queue.length === 0) return;
    
    console.log("Syncing offline items:", queue.length);
    set({ offlineQueue: [] }); // Clear queue before syncing so we don't infinitely loop
    for (const item of queue) {
      await get().addItem(item, true);
    }
  },

  addItem: async (input, isSync = false) => {
    set({ error: null });
    
    const tempId = `temp-${Date.now()}-${Math.random()}`;
    const tempItem: GroceryItem = {
      id: tempId,
      name: input.name,
      category: input.category,
      quantity: Math.max(1, input.quantity),
      purchased: false,
      priority: input.priority,
    };

    // Optimistically add to UI immediately so the user doesn't wait
    if (!isSync) {
      set((state) => ({ items: [tempItem, ...state.items] }));
    }

    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: input.name,
          category: input.category,
          quantity: Math.max(1, input.quantity),
          priority: input.priority,
        }),
      });
      const payload = (await safeFetchJson(res)) as ItemResponse & { error?: string };
      if (!res.ok) throw new Error(payload.error || `Request failed (${res.status})`);

      // Replace temp item with real DB item
      set((state) => ({ 
        items: state.items.map(item => item.id === tempId ? payload.item : item)
      }));
      return payload.item;
    } catch (error: any) {
      console.warn("Network offline, queued item adding:");
      // Add to offline queue if network fails
      if (!isSync) {
        set((state) => ({ offlineQueue: [...state.offlineQueue, input] }));
      } else {
        // If it was already a sync attempt and it failed AGAIN, push back to queue
        set((state) => ({ offlineQueue: [...state.offlineQueue, input] }));
      }
    }
  },

  updateQuantity: async (id, quantity) => {
    const nextQuantity = Math.max(1, quantity);
    set({ error: null });
    
    // Optimistic Update
    const originalItems = get().items;
    set((state) => ({
      items: state.items.map((item) => (item.id === id ? { ...item, quantity: nextQuantity } : item)),
    }));

    try {
      const res = await fetch(`/api/items/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: nextQuantity }),
      });
      const payload = (await safeFetchJson(res)) as ItemResponse & { error?: string };
      if (!res.ok) throw new Error(payload.error || `Request failed (${res.status})`);
    } catch (error: any) {
      console.warn("Offline, reverting quantity update");
      set({ items: originalItems, error: "Offline: Could not update quantity" });
    }
  },

  togglePurchased: async (id) => {
    const currentItem = get().items.find((item) => item.id === id);
    if (!currentItem) return;

    const nextPurchased = !currentItem.purchased;
    set({ error: null });
    
    // Optimistic Update
    const originalItems = get().items;
    set((state) => ({
      items: state.items.map((item) => (item.id === id ? { ...item, purchased: nextPurchased } : item)),
    }));

    try {
      const res = await fetch(`/api/items/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ purchased: nextPurchased }),
      });

      const payload = (await safeFetchJson(res)) as ItemResponse & { error?: string };
      if (!res.ok) throw new Error(payload.error || `Request failed (${res.status})`);
    } catch (error: any) {
      console.warn("Offline, reverting toggle");
      set({ items: originalItems, error: "Offline: Could not update status" });
    }
  },

  removeItem: async (id) => {
    set({ error: null });
    // Optimistic removal
    const originalItems = get().items;
    set((state) => ({ items: state.items.filter((item) => item.id !== id) }));

    try {
      const res = await fetch(`/api/items/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const payload = await safeFetchJson(res).catch(() => ({}));
        throw new Error(payload.error || `Request failed (${res.status})`);
      }
    } catch (error: any) {
      console.warn("Offline, reverting remove");
      set({ items: originalItems, error: "Offline: Could not remove item" });
    }
  },

  clearPurchased: async () => {
    set({ error: null });
    const originalItems = get().items;
    set((state) => ({ items: state.items.filter((item) => !item.purchased) }));

    try {
      const res = await fetch("/api/items/clear-purchased", { method: "POST" });
      if (!res.ok) {
        const payload = await safeFetchJson(res).catch(() => ({}));
        throw new Error(payload.error || `Request failed (${res.status})`);
      }
    } catch (error: any) {
      console.warn("Offline, reverting clear purchased");
      set({ items: originalItems, error: "Offline: Could not clear purchased ones" });
    }
  },
}));
