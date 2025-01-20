import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  List,
  ListItem,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { MdLocalShipping } from "react-icons/md";
import { useProduct } from "../context/ProductProvider";
import { useParams } from "react-router";

const ProductDetail = () => {
  const { id } = useParams();
  const { products, setProducts } = useProduct();
  const item = products[id];
  console.log(item);
  return (
    <Container maxW={"100%"} border={"1px solid"}>
      <SimpleGrid
        columns={{ base: 1, lg: 1 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 6, md: 8 }}
      >
        <Flex>
          <Image
            rounded={"md"}
            alt={""}
            src={item.images[0]}
            fit={"cover"}
            align={"center"}
            width={"100%"}
            h={{ base: "100%", sm: "400px", lg: "500px" }}
            loading="lazy"
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {item.title}
            </Heading>
            <Text
              color={useColorModeValue("gray.900", "gray.400")}
              fontWeight={300}
              fontSize={"2xl"}
            >
              $ {item.price} USD
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text fontSize={"lg"}>{item.description}</Text>
            </VStack>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("teal.500", "teal.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Category
              </Text>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <List spacing={2}>
                  <ListItem>{item.category.name}</ListItem>
                  <ListItem>Product Launch : {item.creationAt}</ListItem>
                  <ListItem>Updated At : {item.updatedAt}</ListItem>
                </List>
              </SimpleGrid>
            </Box>
          </Stack>

          <Button
            aria-label={`Add ${item.title} to cart`}
            w={"50%"}
            margin={"0 auto"}
            mt={8}
            size={"lg"}
            py={"7"}
            bg={useColorModeValue("gray.900", "gray.50")}
            color={useColorModeValue("white", "gray.900")}
            textTransform={"uppercase"}
            _hover={{
              transform: "translateY(2px)",
              boxShadow: "lg",
            }}
            onClick={() => {}}
          >
            Add to cart
          </Button>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent={"center"}
            spacing={2}
          >
            <MdLocalShipping />
            <Text>Instant delivery</Text>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
};

export default ProductDetail;
