import {
  Box,
  Button,
  Image,
  Text,
  Flex,
  Card,
  CardBody,
  useToast,
  Select,
  MenuItem,
  Menu,
  MenuButton,
  MenuList,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSearch } from "../context/SearchContext";
import { useCart } from "../context/CartProvider";
import { useProduct } from "../context/ProductProvider";
import { MdAdd } from "react-icons/md";
import { NavLink } from "react-router";

const Products = () => {
  const { products } = useProduct();
  const { searchValue } = useSearch();
  const { cart, setCart } = useCart();
  const toast = useToast();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("");

  const handelCart = (index) => {
    const selectedProduct = products.find((_, i) => i === index);

    setCart((prevCart) => {
      const productIndex = prevCart.findIndex(
        (item) => item.id === selectedProduct.id
      );

      let updatedCart;

      if (productIndex !== -1) {
        updatedCart = prevCart.map((item, i) =>
          i === productIndex
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        updatedCart = [...prevCart, { ...selectedProduct, quantity: 1 }];
      }

      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  return (
    <>
      <Flex justify={"space-between"} p={4}>
        <Box ml={"20px"}>
          <Select
            placeholder="Filter by Category"
            onChange={(e) => setQuery(e.target.value)}
          >
            <option value="Clothes">Clothes</option>
            <option value="Shoes">Shoes</option>
            <option value="Miscellaneous">Miscellaneous</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
          </Select>
        </Box>
        <Box mr={"40px"}>
          <Menu>
            <MenuButton as={Button}>Sort Product</MenuButton>
            <MenuList>
              <MenuItem onClick={() => setSort("A-Z")}>A-Z</MenuItem>
              <MenuItem onClick={() => setSort("Z-A")}>Z-A</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
      <Box
        display={"inline-flex"}
        flexWrap={"wrap"}
        justifyContent={{ base: "center", sm: "center", md: "space-between" }}
        ml={{ base: "0", md: "40px" }}
        mr={"10px"}
        rowGap={"30px"}
      >
        {products &&
          products
            .filter((product) => {
              return (
                product.title
                  .toLowerCase()
                  .includes(searchValue.toLowerCase()) &&
                product.category?.name
                  ?.toLowerCase()
                  .includes(query.toLowerCase())
              );
            })
            .sort((a, b) => {
              if (sort === "A-Z") {
                return a.title.localeCompare(b.title);
              } else if (sort === "Z-A") {
                return b.title.localeCompare(a.title);
              }
            })
            .map((product, index) => (
              <Card
                padding={10}
                key={index}
                maxW="sm"
                borderRadius="lg"
                overflow="hidden"
                boxShadow="md"
                bg={"gray.100"}
                color={"blackAlpha.900"}
              >
                <Image
                  src={product.images}
                  alt={product.title}
                  overflow={"hidden"}
                />

                <CardBody>
                  <Box p="4">
                    <Text fontSize="lg" fontWeight="bold">
                      {product.title}
                    </Text>
                    <Text fontSize="2xl" fontWeight="medium" mt="2">
                      ${product.price}.00
                    </Text>
                  </Box>
                  <Flex p="2" gap={4} align="center">
                    <NavLink to={`/productDetails/${index}`}>
                      <Button
                        colorScheme="teal"
                        onClick={() =>
                          toast({
                            title: "View Product Clicked",
                            description: "This is test",
                            isClosable: true,
                            duration: 500,
                            position: "top-right",
                          })
                        }
                      >
                        View Product
                      </Button>
                    </NavLink>
                    <Button
                      colorScheme="blackAlpha"
                      variant={"outline"}
                      onClick={() => {
                        handelCart(index);
                        toast({
                          title: "Product Added To Cart",
                          description: `${product.title} Added Successfully`,
                          isClosable: true,
                          duration: 5000,
                          position: "top-right",
                          colorScheme: "teal",
                          icon: <MdAdd />,
                        });
                      }}
                    >
                      Add to Cart
                    </Button>
                  </Flex>
                </CardBody>
              </Card>
            ))}
      </Box>
    </>
  );
};

export default Products;
