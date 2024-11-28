import { Flex, useColorMode } from "@chakra-ui/react";
import WebsiteLayout from "../common/WebsiteLayout";
import { useLocation } from "react-router-dom";
import React from "react";

const Main = ({ children }: { children: React.ReactNode }) => {
  const { colorMode } = useColorMode();
  const { pathname } = useLocation();

  React.useEffect(() => {
    // Scroll the Box to the top whenever the route changes
    const box = document.getElementById("content-box");
    if (box) {
      box.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <WebsiteLayout
      as={"main"}
      overflow={"auto"}
      flexDir={"column"}
      backgroundImage={
        colorMode === "light"
          ? "linear-gradient(to right bottom, #ffffff, #fbfaff, #f5f6ff, #f0f1ff, #e9edff, #e4e9ff, #dfe6ff, #dae2ff, #d5deff, #d0daff, #ccd6fe, #c7d2fe)"
          : "linear-gradient(to right bottom, #171717, #191821, #1b192a, #1c1934, #1d1a3e, #1f1c47, #211e4f, #232058, #262362, #2a276c, #2d2a77, #312e81)"
      }
      backgroundSize={"cover"}
      alignItems={"center"}
      height={"100%"}
      id="content-box"
    >
      <Flex
        flexDir={"column"}
        as={"section"}
        py={4}
        px={{ base: 4, lg: 8, xl: 28 }}
        className="max-w-screen-2xl"
        width={"100%"}
        height={"100%"}
      >
        {children}
      </Flex>
    </WebsiteLayout>
  );
};

export default Main;
