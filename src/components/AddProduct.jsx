import {
  Box,
  Button,
  Card,
  CardBody,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useProduct } from "../context/ProductProvider";
import { FiCheckCircle } from "react-icons/fi";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const { products, setProducts } = useProduct();
  console.log(products.length);
  console.log(products);
  const toast = useToast();

  // Update product

  const handelAdd = () => {
    if (productName && productCategory && productDescription && productPrice) {
      const newProduct = {
        title: productName,
        category: {
          id: products.length + 1,
          name: productCategory,
        },
        images: [productImage],
        price: productPrice,
        description: productDescription,
      };
      setProducts([...products, newProduct]);
      console.log(products);
      toast({
        title: "Success!!!",
        description: `${productName} Has been added Successfully`,
        duration: 5000,
        isClosable: true,
        position: "top-right",
        status: "success",
        icon: <FiCheckCircle />,
      });

      // console.log(products.length);
    } else {
      toast({
        title: "Error!!!",
        description: "All Informations are required !!!",
        duration: 5000,
        isClosable: true,
        position: "top-right",
        status: "error",
      });
    }

    setProductCategory("");
    setProductImage("");
    setProductName("");
    setProductDescription("");
    setProductCategory("");
  };

  return (
    <>
      <Box border={"1px"} p={4} width={"50%"} margin={"0 auto"}>
        <Card color={"teal"}>
          <CardBody>
            <Heading> Add Product </Heading>
            <Stack>
              <Box p={4}>
                <FormControl>
                  <FormLabel>Product Name </FormLabel>
                  <Input
                    colorScheme="blackAlpha"
                    borderColor={"teal.900"}
                    color={"teal.900"}
                    onChange={(e) => {
                      setProductName(e.target.value);
                    }}
                    isRequired
                  ></Input>
                  {!productName ? (
                    <FormHelperText color={"red.500"} fontWeight={"medium"}>
                      {" "}
                      Enter Valid Name
                    </FormHelperText>
                  ) : (
                    ""
                  )}
                </FormControl>
                <Box display={"flex"} gap={"20px"}>
                  <FormControl>
                    <FormLabel>Product Category </FormLabel>
                    <Select
                      onChange={(e) => {
                        setProductCategory(e.target.value);
                      }}
                      placeholder="Select Category"
                    >
                      <option value="Clothes">Clothes</option>
                      <option value="Shoes">Shoes</option>
                      <option value="Miscellaneous">Miscellaneous</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Furniture">Furniture</option>
                    </Select>
                    {!productCategory ? (
                      <FormHelperText color={"red.500"} fontWeight={"medium"}>
                        {" "}
                        Select Product Category
                      </FormHelperText>
                    ) : (
                      ""
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel>Product Price $</FormLabel>
                    <Input
                      colorScheme="blackAlpha"
                      borderColor={"teal.900"}
                      color={"teal.900"}
                      type="number"
                      onChange={(e) => {
                        setProductPrice(e.target.value);
                      }}
                    ></Input>
                  </FormControl>
                </Box>
                <Box display={"flex"} gap={"20px"}>
                  <FormControl>
                    <FormLabel>Product Description</FormLabel>
                    <Textarea
                      colorScheme="blackAlpha"
                      borderColor={"teal.900"}
                      color={"black"}
                      onChange={(e) => {
                        setProductDescription(e.target.value);
                      }}
                    ></Textarea>
                    {!productDescription ? (
                      <FormHelperText color={"red.500"} fontWeight={"medium"}>
                        Enter Description
                      </FormHelperText>
                    ) : (
                      ""
                    )}
                  </FormControl>
                  <Stack>
                    <FormControl>
                      <FormLabel> Select Image</FormLabel>
                      <Input
                        type="file"
                        colorScheme="teal"
                        onChange={(e) => {
                          // console.log(e.target.files[0]);
                          const image = e.target.files[0];
                          if (image) {
                            const reader = new FileReader();
                            reader.onload = () => {
                              const realImg = reader.result;
                            };
                            reader.readAsDataURL(image);
                          }
                        }}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel> Enter Image Link</FormLabel>
                      <Input
                        colorScheme="teal"
                        onChange={(e) => {
                          setProductImage(e.target.value);
                        }}
                      />
                    </FormControl>
                  </Stack>
                </Box>
              </Box>
            </Stack>
            <Box display={"flex"} justifyContent={"center"}>
              <Button
                type="submit"
                width={"200px"}
                colorScheme="teal"
                variant={"outline"}
                onClick={() => handelAdd()}
              >
                Add Product
              </Button>
            </Box>
          </CardBody>
        </Card>
      </Box>
    </>
  );
};

export default AddProduct;
