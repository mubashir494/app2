import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  extendTheme,
  useToast,
  Tooltip,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import * as Msal from "msal";
import { getUser } from "../api/data";

const Links = [
  { name: "Home", href: "/" },
  { name: "Dashboard", href: "/dashboard" },
];

const NavLink = (props) => {
  const { children, path } = props;
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      color={"black"}
      fontWeight={"semi-bold"}
      fontSize={"18px"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
    >
      {" "}
      <Link to>{children}</Link>
    </Box>
  );
};

function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  // const [data, setData] = useState(null);
  // let config = {
  //   auth: {
  //     clientId: process.env.REACT_APP_CLIENT_ID,
  //     authority: "https://login.microsoftonline.com/common",
  //     redirectUri: "http://localhost:3001/",
  //   },
  //   cache: {
  //     cacheLocation: "sessionStorage",
  //     storeAuthStateInCookie: false,
  //   },
  // };

  // const getData = () => {
  //   var client = new Msal.UserAgentApplication(config);
  //   var request = { scopes: ["user.read"] };
  //   client
  //     .acquireTokenSilent(request)
  //     .then((res) => {
  //       getUser(res.accessToken)
  //         .then((res) => {
  //           setData(res.data);
  //         })
  //         .catch((e) => {
  //           toast({ title: e.message });
  //         });
  //       console.log(res.accessToken);
  //     })
  //     .catch((err) => {
  //       toast({ title: "Error" });
  //     });
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box color={"black"} fontWeight={"bold"} fontSize={"18px"}>
              wyoming.com
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              <Box
                as="a"
                px={2}
                py={1}
                rounded={"md"}
                color={"black"}
                fontWeight={"semi-bold"}
                fontSize={"18px"}
                _hover={{
                  textDecoration: "none",
                  bg: useColorModeValue("gray.200", "gray.700"),
                }}
                href={"/"}
              >
                Home
              </Box>
              <Box
                as="a"
                px={2}
                py={1}
                rounded={"md"}
                color={"black"}
                fontWeight={"semi-bold"}
                fontSize={"18px"}
                _hover={{
                  textDecoration: "none",
                  bg: useColorModeValue("gray.200", "gray.700"),
                }}
                href={"/dashboard"}
              >
                Dashboard
              </Box>
            </HStack>
          </HStack>
          {/* <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                {data ? (
                  <Avatar
                    name={data.displayName}
                    src={`https://bit.ly/tioluwani-kolawole`}
                  />
                ) : (
                  <></>
                )}
              </MenuButton>
            </Menu>
          </Flex> */}
        </Flex>
      </Box>
    </>
  );
}

export default Navbar;
