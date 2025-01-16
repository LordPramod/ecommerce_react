import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Products from "./components/Products.jsx";
import Cart from "./components/Cart.jsx";
import SearchProvider from "./context/SearchContext.jsx";
import ProductProvider from "./context/ProductProvider.jsx";
import DeleteProduct from "./components/DeleteProduct.jsx";
import SidebarAndHeader from "./components/SidebarAndHeader.jsx";
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
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider value={defaultSystem}>
      <ProductProvider>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </ProductProvider>
    </ChakraProvider>
  </StrictMode>
);
