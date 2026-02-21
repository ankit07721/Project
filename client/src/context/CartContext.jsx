import { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartChefId, setCartChefId] = useState(null);

  const addToCart = (item) => {
    if (cartChefId && cartChefId !== item.chefId) {
      const confirm = window.confirm(
        'Your cart has items from another chef. Adding this item will clear the cart. Continue?'
      );
      if (!confirm) return false;
      setCartItems([]);
      setCartChefId(null);
    }

    setCartChefId(item.chefId);
    setCartItems((prev) => {
      const existing = prev.find((i) => i._id === item._id);
      if (existing) {
        return prev.map((i) => (i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    return true;
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updated = prev
        .map((i) => (i._id === itemId ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0);
      if (updated.length === 0) setCartChefId(null);
      return updated;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setCartChefId(null);
  };

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, cartChefId, addToCart, removeFromCart, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
