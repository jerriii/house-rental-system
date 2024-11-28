import { useNavigate } from "react-router-dom";
import useCustomColor from "../../../hooks/useCustomColor";
import { Button, Flex, HStack, Image, Stack, Text } from "@chakra-ui/react";
const Hero = () => {
  const { alpha_color } = useCustomColor();
  const navigate = useNavigate();
  return (
    <Flex
      as={"section"}
      width={"100%"}
      alignItems={"center"}
      flexDir={"row"}
      justifyContent={{ base: "center", lg: "space-between" }}
      height={"fit-content"}
      position={"relative"}
      pb={"2rem"}
      borderBottom={"1px solid"}
    >
      <Stack
        as={"article"}
        fontWeight={"bold"}
        fontSize={{ base: "2xl", lg: "3xl" }}
        position={{ base: "absolute", lg: "relative" }}
        inset={"0px"}
        justifyContent={"center"}
        alignItems={{ base: "center", lg: "flex-start" }}
        background={{
          base: alpha_color,
          lg: "transparent",
        }}
        backdropFilter={"blur(8px)"}
        padding={{ base: "0.5rem", lg: 0 }}
        gap={8}
      >
        <Text>
          Find Your
          <br />
          <Text as={"span"}>Rental home</Text>
        </Text>
        <Text
          fontWeight={"normal"}
          fontSize={"lg"}
          wordBreak={"break-word"}
          display={{ base: "none", md: "block" }}
        >
          Where Comfort Meets Convenience,
          <br /> Your Rental Journey Starts Here
        </Text>
        <HStack>
          <Button onClick={() => navigate("/explore")}>Explore</Button>
          <Button variant={"link"} onClick={() => navigate("/login")}>
            Get Started &rarr;
          </Button>
        </HStack>
      </Stack>
      <Image
        src="../../../src/assets/img/house_rental_hero.png"
        alt="house"
        width={{ base: "60%", lg: "40%" }}
      />
    </Flex>
  );
};

export default Hero;
