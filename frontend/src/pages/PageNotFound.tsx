import { Button, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <HStack
      h={"full"}
      justifyContent={"center"}
      flexDir={{ base: "column-reverse", lg: "row" }}
      gap={4}
    >
      <VStack alignItems={"center"} as={"article"}>
        <Heading fontSize={["64px", "96px", "128px"]}>404</Heading>
        <Text fontSize={["24px", "36px"]} textAlign={"center"}>
          Page Not Found
        </Text>
        <Button as={Link} to={"/"} variant={"link"} fontSize={"20px"}>
          Back to Home &rarr;
        </Button>
      </VStack>
      <Image
        src="../../src/assets/img/page_not_found.png"
        alt="page not found"
      />
    </HStack>
  );
};

export default PageNotFound;
