import { Box, Button, Card, Flex, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSearch } from "../context/SearchContext";
import { useCart } from "../context/CartProvider";
import { useProduct } from "../context/ProductProvider";

const Products = () => {
  const { products, setProducts } = useProduct();
  const { searchValue } = useSearch();
  // const fetchProducts = async () => {
  //   try {
  //     const response = await fetch("https://api.escuelajs.co/api/v1/products");
  //     const data = await response.json();
  //     setProducts(data);
  //     localStorage.setItem("products", JSON.stringify(products));
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  // useEffect(() => {
  //   fetchProducts();
  // }, []);
  // const { cart, setCart } = useCart();
  const handelCart = (index) => {
    products
      .filter((_, i) => {
        return i === index;
      })
      .map((product) => {
        // setCart([...cart, product]);
      });
  };

  return (
    <>
      <Box
        display={"inline-flex"}
        flexWrap={"wrap"}
        gap={"10px"}
        justifyContent={"space-between"}
      >
        {products &&
          products
            .filter((product, i) => {
              return product.title
                .toLowerCase()
                .includes(searchValue.toLowerCase());
            })
            .map((product, index) => {
              return (
                <Card.Root maxW="sm" overflow="hidden" key={index}>
                  <Image src={product.images} alt={product.title} />
                  <Card.Body gap="2">
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Description>{}</Card.Description>
                    <Text
                      textStyle="2xl"
                      fontWeight="medium"
                      letterSpacing="tight"
                      mt="2"
                    >
                      ${product.price}.00
                    </Text>
                  </Card.Body>
                  <Card.Footer gap="2">
                    <Button variant="solid">Buy now</Button>
                    <Button variant="ghost" onClick={handelCart(index)}>
                      Add to cart
                    </Button>
                  </Card.Footer>
                </Card.Root>
              );
            })}
      </Box>
    </>
  );
};

export default Products;
