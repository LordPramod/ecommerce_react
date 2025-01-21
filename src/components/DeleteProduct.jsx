import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useProduct } from "../context/ProductProvider";
import { useSearch } from "../context/SearchContext";
import { FiCheckCircle } from "react-icons/fi";
import { useState } from "react";
import { useCart } from "../context/CartProvider";

const DeleteProduct = () => {
  const { products, setProducts } = useProduct();
  const { searchValue } = useSearch();
  const { cart, setCart } = useCart();
  const [productId, setProductId] = useState(null);

  const handleDelete = (index) => {
    const deletedProduct = products[index];
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);

    const updatedCart = cart.filter((item) => item.id !== deletedProduct.id);
    setCart(updatedCart);

    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const toast = useToast();

  const [updatedProductName, setUpdatedProductName] = useState("");
  const [updatedProductCategory, setUpdatedProductCategory] = useState("");
  const [updatedProductDescription, setUpdatedProductDescription] =
    useState("");
  const [updatedProductPrice, setUpdatedProductPrice] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handelUpdate = () => {
    const updatedProduct = {
      title: updatedProductName || products[productId].title,
      price: updatedProductPrice || products[productId].price,
      category: {
        name: updatedProductCategory || products[productId].category.name,
      },
      description: updatedProductDescription || products[productId].description,
    };

    const updatedProducts = [...products];
    updatedProducts[productId] = updatedProduct;

    setProducts(updatedProducts);
    onClose();

    toast({
      title: "Product Updated!",
      description: `${updatedProduct.title} has been updated.`,
      duration: 5000,
      isClosable: true,
      position: "top-right",
      status: "success",
      icon: <FiCheckCircle />,
    });
  };

  const openModal = (index) => {
    setProductId(index);
    onOpen();
  };

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      gap="10px"
      justifyContent="space-between"
    >
      {products &&
        products
          .filter((product) => {
            return product.title
              .toLowerCase()
              .includes(searchValue.toLowerCase());
          })
          .map((product, index) => {
            return (
              <Card maxW="sm" overflow="hidden" key={index}>
                <Image src={product.images} alt={product.title} />
                <CardBody>
                  <Text fontSize="lg" fontWeight="bold">
                    {product.title}
                  </Text>
                  <Text fontSize="2xl" fontWeight="medium" mt="2">
                    ${product.price}.00
                  </Text>
                  <Container>
                    <Modal isCentered isOpen={isOpen} onClose={onClose}>
                      <ModalContent>
                        <ModalHeader>
                          <Heading>Update Product</Heading>
                        </ModalHeader>
                        <ModalCloseButton onClick={onClose} />
                        <ModalBody>
                          <FormControl>
                            <FormLabel>Product Name</FormLabel>
                            <Input
                              placeholder="Enter product name"
                              defaultValue={
                                productId !== null
                                  ? products[productId].title
                                  : ""
                              }
                              onChange={(e) => {
                                setUpdatedProductName(e.target.value);
                              }}
                            />
                          </FormControl>
                          <FormControl mt={4}>
                            <FormLabel>Price $</FormLabel>
                            <Input
                              placeholder="Enter product price"
                              defaultValue={
                                productId !== null
                                  ? products[productId].price
                                  : ""
                              }
                              onChange={(e) => {
                                setUpdatedProductPrice(e.target.value);
                              }}
                            />
                          </FormControl>
                          <FormControl mt={4}>
                            <FormLabel>Product Category</FormLabel>
                            <Select
                              placeholder="Select category"
                              defaultValue={
                                productId !== null
                                  ? products[productId].category.name
                                  : ""
                              }
                              onChange={(e) => {
                                setUpdatedProductCategory(e.target.value);
                              }}
                            >
                              <option value="Clothes">Clothes</option>
                              <option value="Shoes">Shoes</option>
                              <option value="Electronics">Electronics</option>
                              <option value="Shorts">Shorts</option>
                            </Select>
                          </FormControl>
                          <FormControl mt={4}>
                            <FormLabel>Description</FormLabel>
                            <Textarea
                              placeholder="Enter product description"
                              defaultValue={
                                productId !== null
                                  ? products[productId].description
                                  : ""
                              }
                              onChange={(e) => {
                                setUpdatedProductDescription(e.target.value);
                              }}
                            />
                          </FormControl>
                        </ModalBody>
                        <ModalFooter
                          display={"flex"}
                          justifyContent={"space-around"}
                        >
                          <Button
                            width={"80%"}
                            colorScheme="teal"
                            onClick={handelUpdate}
                          >
                            Update
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </Container>
                </CardBody>
                <CardFooter display="flex" gap="2" justify={"space-between"}>
                  <Button
                    variant="solid"
                    colorScheme="orange"
                    onClick={() => {
                      openModal(index);
                    }}
                  >
                    Update
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => {
                      handleDelete(index);
                      toast({
                        title: "Product Deleted!!!",
                        description: `${product.title} has been deleted`,
                        duration: 5000,
                        isClosable: true,
                        position: "top-right",
                        status: "error",
                        icon: <FiCheckCircle />,
                      });
                    }}
                  >
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
    </Box>
  );
};

export default DeleteProduct;
