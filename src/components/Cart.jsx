import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  useToast,
  VStack,
  Divider,
} from "@chakra-ui/react";
import { useCart } from "../context/CartProvider";
import { FiDelete } from "react-icons/fi";

const Cart = () => {
  const { cart, setCart } = useCart();
  const toast = useToast();

  const handelDelete = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
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
    <Box p={6} maxW="1200px" mx="auto">
      <Heading size="lg" mb={6} textAlign="center">
        Shopping Cart ({cart.length} items)
      </Heading>
      <Flex
        gap={8}
        direction={{ base: "column", lg: "row" }}
        justify="space-between"
      >
        <VStack
          spacing={4}
          w={{ base: "100%", lg: "65%" }}
          maxH="70vh"
          overflowY="auto"
          borderWidth="1px"
          borderRadius="lg"
          p={4}
          boxShadow="md"
        >
          {cart.length === 0 ? (
            <Text fontSize="lg" color="gray.500">
              No items in the cart.
            </Text>
          ) : (
            cart.map((item, index) => (
              <Box
                key={index}
                p={4}
                w="full"
                borderWidth="1px"
                borderRadius="lg"
                boxShadow="sm"
              >
                <Flex align="center" gap={4}>
                  <Image
                    src={item.images[0]}
                    alt={item.title}
                    boxSize="100px"
                    objectFit="cover"
                    borderRadius="md"
                  />
                  <Box flex="1">
                    <Text fontWeight="semibold" isTruncated>
                      {item.title}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      Category: {item.category.name}
                    </Text>
                    <Text fontSize="sm" color="gray.600" mt={1}>
                      Qty: {item.quantity || 1}
                    </Text>
                  </Box>
                  <VStack align="flex-end">
                    <Text fontWeight="bold" fontSize="lg">
                      ${item.price}
                    </Text>
                    <IconButton
                      colorScheme="red"
                      aria-label="Delete item"
                      size="sm"
                      icon={<FiDelete />}
                      onClick={() => {
                        handelDelete(index);
                        toast({
                          title: "Item removed",
                          description: `${item.title} was removed from the cart.`,
                          status: "warning",
                          duration: 3000,
                          isClosable: true,
                          position: "top-right",
                        });
                      }}
                    />
                  </VStack>
                </Flex>
              </Box>
            ))
          )}
        </VStack>

        <Box
          w={{ base: "100%", lg: "30%" }}
          borderWidth="1px"
          borderRadius="lg"
          p={4}
          boxShadow="md"
        >
          <Text fontSize="lg" fontWeight="semibold" mb={4}>
            Order Summary
          </Text>
          <Divider mb={4} />
          <Flex justify="space-between" mb={2}>
            <Text>Subtotal</Text>
            <Text>${subTotal.toFixed(2)}</Text>
          </Flex>
          <Flex justify="space-between" mb={2}>
            <Text>Coupon Discount</Text>
            <Text>${coupon.toFixed(2)}</Text>
          </Flex>
          <Flex justify="space-between" mb={2}>
            <Text>Delivery Charge</Text>
            <Text>${delivery.toFixed(2)}</Text>
          </Flex>
          <Divider my={4} />
          <Flex justify="space-between" fontWeight="bold" fontSize="lg">
            <Text>Total</Text>
            <Text>${totalPrice.toFixed(2)}</Text>
          </Flex>
          <Button
            colorScheme="teal"
            w="full"
            mt={4}
            onClick={() => (location.href = "https://esewa.com.np/")}
          >
            Proceed to Checkout
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default Cart;
