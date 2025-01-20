import { createContext, useContext, useEffect, useState } from "react";
const ProductContext = createContext();
export const useProduct = () => useContext(ProductContext);

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState("");
  useEffect(() => {
    const localProducts = localStorage.getItem("products");

    if (localProducts) {
      setProducts(JSON.parse(localProducts));
    } else {
      fetchProducts();
    }
  }, []);
  const fetchProducts = async () => {
    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/products");
      const data = await response.json();
      setProducts(data);
      localStorage.setItem("products", JSON.stringify(products));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products]);
  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
