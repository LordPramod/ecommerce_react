import React, { createContext, useContext } from "react";
import { useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);
const CartProvider = ({ children }) => {
  const localStorageCart = localStorage.getItem("cartItems");
  // console.log(localStorageCart);
  const [cart, setCart] = useState(() => {
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  });
  console.log(cart);
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
