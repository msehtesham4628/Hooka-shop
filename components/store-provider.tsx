"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/lib/catalog";

export type CartLine = {
  product: Product;
  quantity: number;
};

export type Store = {
  cart: CartLine[];
  add: (p: Product) => void;
  change: (id: string, n: number) => void;
  openCart: boolean;
  setOpenCart: (v: boolean) => void;
  wishlist: string[];
  toggleWish: (id: string) => void;
};

const StoreContext = createContext<Store | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [openCart, setOpenCart] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Initialize state from localStorage on initial load
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("nocturne-cart");
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem("nocturne-wish");
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    } catch (error) {
      console.error("Failed to load store from localStorage:", error);
    } finally {
      setIsMounted(true);
    }
  }, []);

  // Sync cart to localStorage only after mount
  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem("nocturne-cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  }, [cart, isMounted]);

  // Sync wishlist to localStorage only after mount
  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem("nocturne-wish", JSON.stringify(wishlist));
    } catch (error) {
      console.error("Failed to save wishlist to localStorage:", error);
    }
  }, [wishlist, isMounted]);

  const add = (p: Product) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => String(item.product.id) === String(p.id)
      );

      if (existingItem) {
        return currentCart.map((item) =>
          String(item.product.id) === String(p.id)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { product: p, quantity: 1 }];
    });
    setOpenCart(true);
  };

  const change = (id: string, n: number) => {
    setCart((currentCart) =>
      n < 1
        ? currentCart.filter((item) => String(item.product.id) !== String(id))
        : currentCart.map((item) =>
            String(item.product.id) === String(id)
              ? { ...item, quantity: n }
              : item
          )
    );
  };

  const toggleWish = (id: string) => {
    setWishlist((currentWish) =>
      currentWish.includes(id)
        ? currentWish.filter((x) => x !== id)
        : [...currentWish, id]
    );
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        add,
        change,
        openCart,
        setOpenCart,
        wishlist,
        toggleWish,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
