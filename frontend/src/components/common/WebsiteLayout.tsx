import { As, Flex, useColorMode } from "@chakra-ui/react";
import React from "react";

const WebsiteLayout = <P extends object>({
  as,
  children,
  ...props
}: {
  as: As;
  children: React.ReactNode;
} & P) => {
  const { colorMode } = useColorMode();
  return (
    <Flex
      as={as}
      background={`${as === "main" || as === "footer" ? "body" : "header"}.${colorMode}`}
      {...(props as P)}
    >
      {children}
    </Flex>
  );
};

export default WebsiteLayout;
