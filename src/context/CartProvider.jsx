import React, { createContext, useContext } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);
const CartProvider = ({ children }) => {
  const [cart, setCart] = React.useState([]);
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
