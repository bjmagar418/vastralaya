import { createContext, useContext, useState } from "react";

const WishContext = createContext();

export const WishProvider = ({ children }) => {
  const [wish, setWish] = useState([]);

  const addToWish = (product) => {
    setWish((prev) => {
    const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromWish = (id) => {
    setWish((prev) => prev.filter((item) => item._id !== id));
  };

  const changeQty = (id, delta) => {
    setWish((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, qty: Math.max(1, item.qty + delta) }
          : item
      )
    );
  };

  const totalItems = wish.reduce((s, c) => s + c.qty, 0);

  return (
    <WishContext.Provider
      value={{ wish, addToWish, removeFromWish, changeQty, totalItems }}
    >
      {children}
    </WishContext.Provider>
  );
};

export const useWish = () => useContext(WishContext);