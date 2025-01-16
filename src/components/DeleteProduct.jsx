import { Box, Button, Card, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useProduct } from "../context/ProductProvider";
import { useSearch } from "../context/SearchContext";

const DeleteProduct = () => {
  const { products, setProducts } = useProduct();
  const { searchValue } = useSearch();

  const handelDelete = (index) => {
    console.log("working");
    const updatedProducts = products.filter((product, i) => i !== index);
    setProducts(updatedProducts);
  };
  return (
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
                  <Button variant="solid" colorPalette={"cyan"}>
                    View Product
                  </Button>
                  <Button
                    variant="ghost"
                    colorPalette={"red"}
                    onClick={() => handelDelete(index)}
                  >
                    Delete
                  </Button>
                </Card.Footer>
              </Card.Root>
            );
          })}
    </Box>
  );
};

export default DeleteProduct;
