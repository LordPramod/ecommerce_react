import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Stack,
  Text,
  VStack,
  Avatar,
  Divider,
  AvatarBadge,
  useDisclosure,
  CloseButton,
} from "@chakra-ui/react";
import {
  FiBell,
  FiChevronDown,
  FiDelete,
  FiEdit,
  FiHome,
  FiNavigation,
  FiNavigation2,
  FiPlus,
  FiSearch,
  FiShoppingCart,
} from "react-icons/fi";
import Products from "./Products.jsx";
import { Form, NavLink, Outlet } from "react-router";
import { useState } from "react";
import { useSearch } from "../context/SearchContext.jsx";
import { useCart } from "../context/CartProvider.jsx";
import { IoReorderThreeOutline } from "react-icons/io5";

const SidebarAndHeader = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { cart } = useCart();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchValue);
  };
  const { searchValue, setSearchValue } = useSearch();
  return (
    <>
      <Grid
        maxH="100vh"
        templateColumns="repeat(6, 1fr)"
        templateRows="auto 1fr"
        gap={4}
        height={"100%"}
        overflow="hidden"
      >
        {/* Side Nav */}
        <GridItem
          display={{ base: "none", md: "none", lg: "block" }}
          colSpan={1}
          rowSpan={2}
          height="100vh"
          bg="gray.100"
          color="blackAlpha.900"
          position="sticky"
          top={0}
          zIndex={1}
        >
          <Flex justifyContent="flex-start" m="24px">
            <Text fontSize="4xl" fontFamily="monospace" fontWeight="bolder">
              Logo
            </Text>
          </Flex>
          <Stack
            ml="10px"
            mr="10px"
            gap={4}
            fontSize="xl"
            role="group"
            fontFamily="sans-serif"
            fontWeight="bold"
          >
            <Box py={4} borderRadius="10px" _hover={{ bg: "cyan.400" }}>
              <Box ml="10px" display="flex" gap="10px" alignItems="center">
                <FiHome />
                <NavLink to="/">Home</NavLink>
              </Box>
            </Box>
            <Box py={4} borderRadius="10px" _hover={{ bg: "cyan.400" }}>
              <Box ml="10px" display="flex" gap="10px" alignItems="center">
                <FiPlus />
                <NavLink to="/addProduct">Add</NavLink>
              </Box>
            </Box>
            <Box py={4} borderRadius="10px" _hover={{ bg: "red.300" }}>
              <Box ml="10px" display="flex" gap="10px" alignItems="center">
                <FiEdit />
                <NavLink to="/deleteProduct">Manage Products</NavLink>
              </Box>
            </Box>
          </Stack>
        </GridItem>

        {/* Head Nav */}
        <GridItem
          colSpan={{ base: 6, lg: 5 }}
          bg="gray.100"
          padding={2}
          color={"blackAlpha.900"}
          position="sticky"
          top={0}
          zIndex={10}
          display={"flex"}
          // alignItems={"center"}
          gap={{ base: "20px", lg: 0 }}
          justifyContent={{
            base: "space-evenly",
            md: "space-between",
            lg: "space-between",
          }}
        >
          <Flex gap={{ base: "20px", lg: 0 }} alignItems={"center"}>
            <Box
              display={{ base: "flex", lg: "none" }}
              flexDirection="column"
              width={{ base: "60px" }}
              position="relative"
              onClick={() => {
                onOpen();
              }}
            >
              <IoReorderThreeOutline size={"60px"} />

              {isOpen && (
                <Box
                  pb={4}
                  display={{ lg: "none" }}
                  position="absolute"
                  top="100%"
                  left={0}
                  bg="white"
                  boxShadow="md"
                  borderRadius="md"
                  zIndex={2}
                  width="max-content"
                >
                  <VStack spacing={4} align="stretch" p={4}>
                    <HStack>
                      <FiHome />
                      <NavLink to="/">Home</NavLink>
                      <Box display={"flex"} ml={"auto"}>
                        <CloseButton
                          onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                          }}
                        />
                      </Box>
                    </HStack>
                    <HStack>
                      <FiPlus />
                      <NavLink to="/addProduct">Add</NavLink>
                    </HStack>
                    <HStack>
                      <FiEdit />
                      <NavLink to="/deleteProduct">Manage Products</NavLink>
                    </HStack>
                    <Input
                      type="search"
                      placeholder="Search Product"
                      w={"full"}
                      borderRadius={"16px"}
                      color={"gray.900"}
                      fontSize={"md"}
                      _placeholder={{
                        color: "gray.900",
                      }}
                      onChange={(e) => setSearchValue(e.target.value)}
                      h={"46px"}
                    />
                  </VStack>
                </Box>
              )}
            </Box>

            <Box display={{ base: "flex", lg: "none" }}>
              <Text fontSize="4xl" fontFamily="monospace" fontWeight="bolder">
                Logo
              </Text>
            </Box>
          </Flex>
          <Flex
            justifyContent=""
            mr="40px"
            alignItems={"center"}
            mt={"20px"}
            gap="40px"
          >
            <Box
              width="400px"
              color={"blackAlpha.800"}
              display={{ base: "none", md: "block", lg: "block" }}
            >
              <form onSubmit={handleSubmit}>
                <Input
                  placeholder="Search"
                  type="text"
                  fontSize={"xl"}
                  color={"blackAlpha.900"}
                  borderColor={"blackAlpha.900"}
                  _placeholder={{ color: "black" }}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </form>
            </Box>
            <Box
              color={"blackAlpha.900"}
              display={{ base: "none", md: "block", lg: "block" }}
            >
              <NavLink to="/cart">
                <Avatar icon={<FiShoppingCart size={"24px"} />} color={"black"}>
                  <AvatarBadge bg={"none"} border={"none"} fontSize={"md"}>
                    <Text>{cart.length}</Text>
                  </AvatarBadge>{" "}
                </Avatar>
              </NavLink>
            </Box>
            <Menu>
              <MenuButton as={Button} variant={"ghost"}>
                <HStack>
                  <Avatar
                    size="md"
                    src="https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  />
                  <VStack align="flex-start" spacing={0} ml={2}>
                    <Text fontSize="md">Pramod Thapa</Text>
                    <Text fontSize="sm" color="gray.600">
                      Admin
                    </Text>
                  </VStack>
                </HStack>
              </MenuButton>
              <MenuList bg="gray.50">
                <MenuItem>Profile</MenuItem>
                <MenuItem>Setting</MenuItem>
                <MenuItem>Billing</MenuItem>
                <Divider />
                <MenuItem color="red.500">Sign out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </GridItem>

        <GridItem colSpan={{ base: 6, lg: 5 }} bg="gray.50" overflow="auto">
          <Outlet />
        </GridItem>
      </Grid>
    </>
  );
};

export default SidebarAndHeader;
