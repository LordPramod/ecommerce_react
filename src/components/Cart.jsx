import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Select,
  SelectField,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useCart } from "../context/CartProvider";
import { FiDelete } from "react-icons/fi";

const Cart = () => {
  const { cart, setCart } = useCart();

  const toast = useToast();

  const handelDelete = (index) => {
    console.log("click");
    const newCart = cart.filter((_, i) => {
      return i !== index;
    });
    setCart(newCart);
    localStorage.setItem("cartItems", JSON.stringify(newCart));
  };

  const subTotal = cart.reduce(
    (total, product) => total + product.price * (product.quantity || 1),
    0
  );
  const delivery = 0;
  const coupon = 0;
  const totalPrice = subTotal - delivery - coupon;

  return (
    <Box p={8} border={"1px solid black"}>
      <Heading size={"xl"} mb={"20px"}>
        Shopping Cart {cart.length} items
      </Heading>
      <Flex
        gap={"50px"}
        overflowY={"auto"}
        flexDir={{ base: "column", lg: "row" }}
      >
        <Stack
          gap={"20px"}
          overflowY={"auto"}
          maxH={"100vh"}
          width={{ base: "90vw" }}
        >
          {!cart
            ? "No Items in Cart"
            : cart.map((item, index) => {
                return (
                  <Box
                    key={index}
                    p={4}
                    borderWidth="1px"
                    borderRadius="lg"
                    boxShadow="md"
                    border={"1px solid"}
                  >
                    <Flex alignItems={"center"}>
                      <Image
                        src={item.images[0]}
                        maxHeight={"150px"}
                        maxW={"150px"}
                        objectFit="cover"
                      />
                      <Box p={4} flex="1">
                        <Flex
                          alignItems={"center"}
                          justifyContent={"space-between"}
                        >
                          <Stack
                            verticalAlign={"bottom"}
                            minW={"200px"}
                            minH={"100px"}
                          >
                            <Text>{item.title}</Text>
                            <Text>Category : {item.category.name}</Text>
                          </Stack>
                          <HStack
                            flex={"max-content"}
                            flexDir={"row"}
                            justify={"space-between"}
                          >
                            <Box w={"20px"} h={"20px"}>
                              {item.quantity}
                            </Box>

                            <Text fontSize={"larger"} fontWeight={"medium"}>
                              ${item.price}
                            </Text>
                            <IconButton
                              colorScheme="red"
                              variant={"ghost"}
                              size={"sm"}
                              onClick={() => {
                                handelDelete(index);
                                toast({
                                  title: "Removed From Cart",
                                  description: `${item.title} Has been removed from the cart!`,
                                  duration: 5000,
                                  isClosable: true,
                                  colorScheme: "red",
                                  position: "top-right",
                                });
                              }}
                              icon={<FiDelete size={"sm"} />}
                            />
                          </HStack>
                        </Flex>
                      </Box>
                    </Flex>
                  </Box>
                );
              })}
        </Stack>

        <Box
          width={{ base: "300px", sm: "400px", md: "400px", lg: "500px" }}
          margin={{ base: "0 auto", lg: "0" }}
        >
          <Box
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="md"
            fontWeight={"thin"}
          >
            <Flex justifyContent={"space-between"} mb={2}>
              <Text>Sub Total</Text>
              <Text>${subTotal}</Text>
            </Flex>
            <Flex justifyContent={"space-between"} mb={2}>
              <Text>Coupon</Text>
              <Text>${coupon}</Text>
            </Flex>
            <Flex justifyContent={"space-between"} mb={2}>
              <Text>Delivery Charge</Text>
              <Text>${delivery}</Text>
            </Flex>
            <Flex
              mt={4}
              justifyContent={"space-between"}
              fontWeight={"bold"}
              fontSize={"xl"}
            >
              <Text>Total</Text>
              <Text>${totalPrice}</Text>
            </Flex>
            <Button
              colorScheme={"cyan"}
              w={"full"}
              mt={4}
              onClick={() => {
                location.href = "https://esewa.com.np/";
              }}
            >
              CheckOut
            </Button>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Cart;
