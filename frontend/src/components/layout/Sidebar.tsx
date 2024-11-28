import React from "react";
import { Flex, useColorMode } from "@chakra-ui/react";
import WebsiteLayout from "../common/WebsiteLayout";
import { NavLink } from "react-router-dom";
import { NavbarTypes } from "../../types";
import useCustomColor from "../../hooks/useCustomColor";

const Sidebar = ({
  showSidebar,
  setShowSidebar,
  navlinks,
}: {
  showSidebar: boolean;
  setShowSidebar: () => void;
  navlinks: NavbarTypes[];
}) => {
  const { colorMode } = useColorMode();
  const { alpha_color } = useCustomColor();

  return (
    <Flex
      as={"aside"}
      width={showSidebar ? "100%" : 0}
      display={{ base: "flex", lg: "none" }}
      position={"absolute"}
      mt={"3.5rem"}
      height="calc(100dvh - 3.5rem)"
      background={alpha_color}
      onClick={(e) => {
        e.stopPropagation();
        setShowSidebar();
      }}
      zIndex={20}
      className="shadow-lg"
      transition={"all .3s ease"}
    >
      <WebsiteLayout
        as="nav"
        gap={2}
        flexDir={"column"}
        width={showSidebar ? "13rem" : 0}
        p={showSidebar ? 2 : 0}
        onClick={(e: { stopPropagation: () => void }) => {
          e.stopPropagation();
        }}
        transition={"width .3s ease"}
      >
        {showSidebar &&
          navlinks.map((link, i) => (
            <React.Fragment key={`${link.id} + ${i}`}>
              <NavLink
                key={`${link.id} + ${i}`}
                to={link.path}
                onClick={() => showSidebar && setShowSidebar()}
                className={({ isActive }) =>
                  `navlinks ${isActive ? `${colorMode === "light" ? "bg-indigo-500 hover:bg-indigo-600 text-white" : "bg-indigo-200 hover:bg-indigo-300 text-black"}` : `${colorMode === "light" ? "hover:bg-hover_light" : "hover:bg-white hover:bg-opacity-15"}`}`
                }
              >
                {link.logo}

                {link.name}
              </NavLink>
            </React.Fragment>
          ))}
      </WebsiteLayout>
    </Flex>
  );
};

export default Sidebar;
