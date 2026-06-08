import { createContext, useContext, useState, type ReactNode } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image?: string;
  quantity: number;
  variant?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number, variant?: string) => void;
  updateQuantity: (id: number, quantity: number, variant?: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems((prev) => {
      const key = `${item.id}-${item.variant ?? ''}`;
      const existing = prev.find((i) => `${i.id}-${i.variant ?? ''}` === key);
      if (existing) {
        return prev.map((i) =>
          `${i.id}-${i.variant ?? ''}` === key ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number, variant?: string) => {
    const key = `${id}-${variant ?? ''}`;
    setCartItems((prev) => prev.filter((i) => `${i.id}-${i.variant ?? ''}` !== key));
  };

  const updateQuantity = (id: number, quantity: number, variant?: string) => {
    const key = `${id}-${variant ?? ''}`;
    if (quantity <= 0) {
      removeFromCart(id, variant);
      return;
    }
    setCartItems((prev) =>
      prev.map((i) => (`${i.id}-${i.variant ?? ''}` === key ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => setCartItems([]);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        isCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
