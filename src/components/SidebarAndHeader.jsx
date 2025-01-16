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
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  FiBell,
  FiChevronDown,
  FiDelete,
  FiEdit,
  FiHome,
  FiPlus,
  FiSearch,
  FiShoppingCart,
} from "react-icons/fi";
import { Avatar } from "./ui/avatar.jsx";
import { Field, FieldInput, MenuSeparator } from "@ark-ui/react";
import Products from "./Products.jsx";
import { Form, NavLink, Outlet } from "react-router";
import { useState } from "react";
import { useSearch } from "../context/SearchContext.jsx";

const SidebarAndHeader = () => {
  const handelSubmit = (e) => {
    e.preventDefault();
    console.log(searchValue);
  };
  const { searchValue, setSearchValue } = useSearch();
  return (
    <>
      <Grid
        maxH={"100vh"}
        templateColumns="repeat(6, 1fr)"
        templateRows="repeat(6, 1fr)"
        gap={4}
      >
        <GridItem colSpan={1} rowSpan={6} height={"100vh"} bg={"ButtonFace"}>
          <Flex justifyContent={"flex-start"} m={"24px"}>
            <Text
              fontSize={"4xl"}
              fontFamily={"monospace"}
              fontWeight={"bolder"}
            >
              Logo
            </Text>
          </Flex>
          <Stack
            ml={"10px"}
            mr={"10px"}
            gap={4}
            fontSize={"xl"}
            role="group"
            fontFamily={"sans-serif"}
            fontWeight={"bold"}
          >
            <Box py={4} borderRadius={"10px"} _hover={{ bg: "cyan.400" }}>
              <Box
                ml={"10px"}
                display={"flex"}
                gap={"10px"}
                alignItems={"center"}
              >
                <FiHome />
                <NavLink to={"/"}>Home</NavLink>
              </Box>
            </Box>
            <Box py={4} borderRadius={"10px"} _hover={{ bg: "cyan.400" }}>
              <Box
                ml={"10px"}
                display={"flex"}
                gap={"10px"}
                alignItems={"center"}
              >
                <FiPlus />
                <NavLink to={"/"}>Add</NavLink>
              </Box>
            </Box>
            <Box
              py={4}
              borderRadius={"10px"}
              _hover={{ bg: "bg.warning", color: "fg.error" }}
            >
              <Box
                ml={"10px"}
                display={"flex"}
                gap={"10px"}
                alignItems={"center"}
              >
                <FiDelete />
                <NavLink to={"/deleteProduct"}>Delete</NavLink>
              </Box>
            </Box>
            <Box py={4} borderRadius={"10px"} _hover={{ bg: "cyan.400" }}>
              <Box
                ml={"10px"}
                display={"flex"}
                gap={"10px"}
                alignItems={"center"}
              >
                <FiEdit />
                <NavLink to={"/"}>Update</NavLink>
              </Box>
            </Box>
          </Stack>
        </GridItem>
        <GridItem colSpan={5} bg={"gray.200"} padding={2}>
          <Flex
            justifyContent={"end"}
            mr={"40px"}
            alignItems={"center"}
            gap={"40px"}
          >
            <Box width={"400px"}>
              <Form onSubmit={handelSubmit}>
                <Input
                  placeholder="Search"
                  type="text"
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </Form>
            </Box>
            <Box>
              <NavLink to={"/cart"}>
                <IconButton
                  variant={"ghost"}
                  aria-label={"open menu"}
                  size={"xl"}
                >
                  <FiShoppingCart />
                </IconButton>
              </NavLink>
            </Box>
            <MenuRoot positioning={{ placement: "left-start" }}>
              <MenuTrigger
                asChild
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: "none" }}
              >
                <HStack>
                  <Avatar
                    size={"sm"}
                    src="https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                    variant="subtle"
                    name="user-profile"
                  />
                  <VStack align={"flex-start"} spaceX={1} ml={"2"}>
                    <Text fontSize="sm">Pramod Thapa</Text>
                    <Text fontSize="xs" color={"gray.600"}>
                      Admin
                    </Text>
                  </VStack>
                  <FiChevronDown />
                </HStack>
              </MenuTrigger>
              <MenuContent bg={"gray.50"}>
                <MenuItem>Profile</MenuItem>
                <MenuItem>Setting</MenuItem>
                <MenuItem>Billing</MenuItem>
                <MenuSeparator />
                <MenuItem color={"fg.error"} bg={"bg.error"}>
                  Sign out
                </MenuItem>
              </MenuContent>
            </MenuRoot>
          </Flex>
        </GridItem>

        <GridItem colSpan={5} bg={"gray.subtle"}>
          <Outlet />
        </GridItem>
      </Grid>
    </>
  );
};

export default SidebarAndHeader;
