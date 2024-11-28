import { HStack, Image, Text, VStack } from "@chakra-ui/react";

const Hero = () => {
  return (
    <>
      {/* our journey */}
      <HStack py={12} justifyContent={"space-between"}>
        <VStack
          as={"section"}
          maxWidth={"550px"}
          justifyContent={"space-between"}
          alignItems={"flex-start"}
        >
          <Text>
            This House Rental System is a comprehensive web application designed
            to streamline the process of renting properties. It caters to both
            tenants and landlords, offering a user-friendly platform for
            property listings, tenant and landlord management, and contract
            handling.
          </Text>
        </VStack>
        <Image
          width={"40%"}
          src="../../../../src/assets/img/about_us_hero_image.png"
          alt="hero image"
        />
      </HStack>
      {/* <HStack>
        <VStack
          as={"section"}
          maxWidth={"550px"}
          justifyContent={"space-between"}
          alignItems={"flex-start"}
        >
          <Text fontWeight={"bold"} fontSize={{ base: "2xl", lg: "3xl" }}>
            Our Values
          </Text>
          <Text>
            Our story is one of continuous growth and evolution. We started as a
            small team with big dreams, determined to create a real estate
            platform that transcended the ordinary.
          </Text>
        </VStack>
      </HStack> */}
    </>
  );
};

export default Hero;
