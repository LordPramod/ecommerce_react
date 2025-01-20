import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Products from "./components/Products.jsx";
import Cart from "./components/Cart.jsx";
import SearchProvider from "./context/SearchContext.jsx";
import ProductProvider from "./context/ProductProvider.jsx";
import DeleteProduct from "./components/DeleteProduct.jsx";
import SidebarAndHeader from "./components/SidebarAndHeader.jsx";
import CartProvider from "./context/CartProvider.jsx";
import AddProduct from "./components/AddProduct.jsx";
import ProductDetail from "./components/ProductDetail.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <SearchProvider>
        <SidebarAndHeader />
      </SearchProvider>
    ),
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/deleteProduct",
        element: <DeleteProduct />,
      },
      {
        path: "/addProduct",
        element: <AddProduct />,
      },
      {
        path: "/productDetails/:id",
        element: <ProductDetail />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider>
      <CartProvider>
        <ProductProvider>
          <RouterProvider router={router}>
            <App />
          </RouterProvider>
        </ProductProvider>
      </CartProvider>
    </ChakraProvider>
  </StrictMode>
);
