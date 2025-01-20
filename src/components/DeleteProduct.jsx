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

const DeleteProduct = () => {
  const { products, setProducts } = useProduct();
  const { searchValue } = useSearch();

  const [productId, setProductId] = useState(null);

  const handleDelete = (index) => {
    console.log("working");
    const updatedProducts = products.filter((product, i) => i !== index);
    setProducts(updatedProducts);
  };

  const toast = useToast();

  // Update States

  const [updatedProduct, setupdatedProduct] = useState({
    title: "",
    category: {
      name: "",
    },
    price: "",
    description: "",
  });
  const [updatedProductName, setUpdatedProductName] = useState("");
  const [updatedProductCategory, setUpdatedProductCategory] = useState("");
  const [updatedProductDescription, setUpdatedProductDescription] =
    useState("");
  const [updatedProductPrice, setUpdatedProductPrice] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handelUpdate = () => {
    console.log(productId);
    console.log(products[productId]);
    console.log("Working");
  };

  const openModal = (index) => {
    setProductId(index);
    onOpen();
  };
  console.log(products);
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
                          {" "}
                          <Heading>Update Product </Heading>
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
                            >
                              <option value="Clothes">Clothes</option>
                              <option value="Shoes">Shoes</option>
                              <option value="Electronics">Electronics</option>
                              <option value="Shorts">Shorts</option>
                            </Select>
                          </FormControl>
                          <FormControl>
                            <FormLabel>Description</FormLabel>
                            <Textarea
                              placeholder="Enter product description"
                              defaultValue={
                                productId !== null
                                  ? products[productId].description
                                  : ""
                              }
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
                            onClick={() => {
                              handelUpdate();
                            }}
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
      <Box> </Box>
    </Box>
  );
};

export default DeleteProduct;
