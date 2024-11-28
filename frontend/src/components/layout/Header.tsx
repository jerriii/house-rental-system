import {
  Button,
  Flex,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useColorMode,
  VStack,
  useBoolean,
  InputLeftElement,
} from "@chakra-ui/react";
import WebsiteLayout from "../common/WebsiteLayout";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaArrowLeft, FaCaretDown, FaSearch } from "react-icons/fa";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { NavbarTypes } from "../../types";
import useCustomColor from "../../hooks/useCustomColor";
import { IoLocationSharp } from "react-icons/io5";
import useUserAuthStore from "../../contexts/useUserAuthContext";

const Header = ({
  toggleSidebar,
  navlinks,
}: {
  toggleSidebar: () => void;
  navlinks: NavbarTypes[];
}) => {
  const navigate = useNavigate();
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [flag, setFlag] = useBoolean();
  const { colorMode, toggleColorMode } = useColorMode();
  const { header_background } = useCustomColor();
  const { user,isAuthenticated, logout } = useUserAuthStore();
  const isLoggedIn = isAuthenticated;

  const handleSearch = () => {
    if (flag && inputRef.current) {
      inputRef.current.focus();
    }
  };
  return (
    <WebsiteLayout
      as="header"
      justifyContent={"space-between"}
      py={2}
      px={{ base: 4, lg: 8, xl: 28 }}
      position={"relative"}
      alignItems={"center"}
      height={"3.5rem"}
      width={"100%"}
      zIndex={10}
      className="shadow-lg"
    >
      {/* search input for mobile */}
      <VStack
        pos={"absolute"}
        inset={"0px"}
        display={{ base: flag ? "flex" : "none", lg: "none" }}
        flexDir={"row"}
        width={"100%"}
        height={"100%"}
        background={header_background}
        px={4}
        py={2}
        zIndex={10}
        justifyContent={"center"}
        alignItems={"flex-start"}
      >
        <Button
          variant={"ghost"}
          colorScheme="none"
          onClick={setFlag.off}
          p={0}
        >
          <FaArrowLeft />
        </Button>
        <InputGroup
          size={"xs"}
          width={"100%"}
          display={{ base: "flex", lg: "none" }}
        >
          <InputLeftElement pointerEvents="none" top={2}>
            <IoLocationSharp
              style={{
                width: "1rem",
                height: "1rem",
              }}
            />
          </InputLeftElement>
          <Input
            ref={(el) => {
              inputRef.current = el;
              handleSearch();
            }}
            type="search"
            placeholder="Search Locations"
            id="search-mobile"
            px="3.5rem"
            h={"2.5rem"}
            borderRadius={"full"}
            border={"1px"}
            _placeholder={{
              color: `${colorMode === "light" ? "black" : "white"}`,
            }}
            onBlur={setFlag.off}
          />
          <InputRightElement
            width="fit-content"
            textAlign={"center"}
            borderRadius={"full"}
            color={colorMode === "light" ? "white" : "black"}
            bg={colorMode === "light" ? "buttonColors.500" : "buttonColors.200"}
            w={"2.5rem"}
            h={"2.5rem"}
            id="search"
            _hover={{ cursor: "pointer" }}
          >
            <FaSearch />
          </InputRightElement>
        </InputGroup>
      </VStack>

      {/* header section */}
      <HStack flexWrap={"nowrap"}>
        {/* hamburger icon */}
        <Button
          p={0}
          onClick={toggleSidebar}
          display={{ base: "flex", lg: "none" }}
          variant={"ghost"}
          colorScheme="none"
        >
          <GiHamburgerMenu className="w-6 h-6" />
        </Button>

        {/* logo */}
        <Image src="/houserentallogo.jpg" width={9} onClick={() => navigate("/")} />
      </HStack>

      {/* navlinks */}
      <Flex as={"nav"} gap={8} display={{ base: "none", lg: "flex" }}>
        {navlinks.map((link, i) => (
          <React.Fragment key={`${link.id} + ${i}`}>
            <NavLink
              key={`${link.id} + ${i}`}
              to={link.path}
              className={({ isActive }) =>
                `flex flex-row flex-nowrap gap-2 ${isActive ? `${colorMode === "light" ? "text-indigo-500 hover:text-indigo-600" : "text-indigo-200 hover:text-indigo-300"}` : `${colorMode === "light" ? "hover:text-indigo-500" : "hover:text-indigo-200"}`}`
              }
            >
              {link.logo}
              <Text as={"span"}>{link.name}</Text>
            </NavLink>
          </React.Fragment>
        ))}
      </Flex>
      <Stack as={"section"} flexDir={"row"} alignItems={"center"}>
        {/* search icon */}
        <Button
          colorScheme="none"
          display={{ base: "flex", lg: "none" }}
          variant={"ghost"}
          p={0}
          _hover={{ cursor: "pointer" }}
          onClick={setFlag.on}
        >
          <FaSearch style={{ width: "1.5rem", height: "1.5rem" }} />
        </Button>
        {/* search input for desktop
        <InputGroup
          size={"sm"}
          width={"fit-content"}
          display={{ base: "none", lg: "flex" }}
        >
          <Input
            type="search"
            placeholder="Search location"
            id="search"
            pr="3.5rem"
            h={"3rem"}
            borderRadius={"full"}
            border={"1px"}
          />
          <InputRightElement
            width="fit-content"
            textAlign={"center"}
            borderRadius={"full"}
            color={colorMode === "light" ? "white" : "black"}
            bg={colorMode === "light" ? "buttonColors.500" : "buttonColors.200"}
            w={"2.5rem"}
            h={"2.5rem"}
            id="search"
            right={"0.25rem"}
            top={"0.25rem"}
            _hover={{ cursor: "pointer" }}
          >
            <FaSearch />
          </InputRightElement>
        </InputGroup> */}

        {/* profile icon or login button */}
        {isLoggedIn ? (
          <Menu>
            <MenuButton fontWeight={"bold"} display={"flex"}>
              <Flex flexDir={"row"} gap={1} flexWrap={"nowrap"} alignItems={"center"}>
              <Text>{user?.name}</Text>
              <Text><FaCaretDown /></Text>
              </Flex>
            </MenuButton>
            <MenuList className="!shadow-lg">
              <MenuItem onClick={toggleColorMode}>
                {colorMode === "light" ? "dark" : "light"}
              </MenuItem>
              <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
              <MenuItem
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Button onClick={() => navigate("/login")}>Login</Button>
        )}
      </Stack>
    </WebsiteLayout>
  );
};

export default Header;
