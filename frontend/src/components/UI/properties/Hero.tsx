import { Text, VStack } from "@chakra-ui/react";

const Hero = () => {
  return (
    <VStack
      as="article"
      alignItems={"flex-start"}
      borderBottom={"1px solid"}
      gap={8}
      py={{ base: 14, lg: 28 }}
    >
      <Text fontSize={{ base: "2xl", lg: "3xl" }} fontWeight={"bold"}>
        Discover Your <br />
        Perfect Rental
      </Text>
      <Text textAlign={"justify"}>
        Welcome to HomeFinders, where your perfect rental home is a click away.
        Explore a variety of properties suited to your lifestyle. Start your
        journey with HomeFinders and find a place you'll love.
      </Text>
    </VStack>
  );
};

export default Hero;
