import { create } from "zustand";

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: [],

  // 1. Add Item Action (Increments quantity if item exists, else inserts new)
  addItem: (product) => set((state) => {
    const existingItem = state.cart.find((item) => item.id === product.id);
    
    if (existingItem) {
      return {
        cart: state.cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    }
    
    return { cart: [...state.cart, { ...product, quantity: 1 }] };
  }),

  // 2. Remove Item Action (Slices the item completely out of the collection)
  removeItem: (id) => set((state) => ({
    cart: state.cart.filter((item) => item.id !== id),
  })),

  // 3. Update Quantity Action (Handles numerical adjustments safely)
  updateQuantity: (id, quantity) => set((state) => {
    if (quantity <= 0) {
      return { cart: state.cart.filter((item) => item.id !== id) };
    }
    return {
      cart: state.cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    };
  }),

  // 4. Reset/Clear Action
  clearCart: () => set({ cart: [] }),
}));