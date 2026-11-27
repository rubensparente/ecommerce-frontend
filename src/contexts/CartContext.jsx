import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

const CART_STORAGE_KEY = 'digital_store_cart';
const ORDER_STORAGE_KEY = 'digital_store_last_order';

const loadFromStorage = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => loadFromStorage(CART_STORAGE_KEY, []));
  const [lastOrder, setLastOrder] = useState(() =>
    loadFromStorage(ORDER_STORAGE_KEY, null)
  );

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (lastOrder) {
      localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(lastOrder));
    } else {
      localStorage.removeItem(ORDER_STORAGE_KEY);
    }
  }, [lastOrder]);

  const addToCart = (product) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.id === product.id &&
          item.size === product.size &&
          item.color === product.color
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + (product.quantity || 1),
        };
        return updated;
      }

      return [...prev, { ...product, quantity: product.quantity || 1 }];
    });
  };

  const updateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = items.reduce(
    (acc, item) => acc + (item.priceDiscount ?? item.price) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        subtotal,
        lastOrder,
        setLastOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);