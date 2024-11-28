import { HStack, Image, Text, VStack } from "@chakra-ui/react";
import WebsiteLayout from "../common/WebsiteLayout";
import { CiLocationOn, CiMail, CiPhone } from "react-icons/ci";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
const Footer = () => {
  return (
    <WebsiteLayout
      as="footer"
      py={{ base: 10, lg: 20 }}
      justifyContent={{ base: "center", md: "space-between" }}
      background="transparent"
      borderTop="1px solid"
      flexDir={{ base: "column", sm: "row" }}
      gap={10}
      alignItems={"center"}
      flexWrap={"wrap"}
    >
      <HStack
        as="article"
        w={{ base: "100%", md: "auto" }}
        justifyContent={"center"}
      >
        <Image src="/houserentallogo.jpg" width={9} />
        <Text>House Rental</Text>
      </HStack>
      <VStack alignItems={"flex-start"}>
        <Text display={"flex"} flexDir={"row"} gap={2} alignItems={"center"}>
          <CiMail />
          <Text as={"span"}>birajstuladhar@gmail.com</Text>
        </Text>
        <Text display={"flex"} flexDir={"row"} gap={2} alignItems={"center"}>
          <CiPhone />
          <Text as={"span"}>9860931866</Text>
        </Text>
        <Text display={"flex"} flexDir={"row"} gap={2} alignItems={"center"}>
          <CiLocationOn />
          <Text as={"span"}>Kathmandu, Nepal</Text>
        </Text>
      </VStack>
      <VStack alignItems={"flex-start"}>
        <Text display={"flex"} flexDir={"row"} gap={2} alignItems={"center"}>
          <FaFacebook />
          <Text as={"span"}>Facebook</Text>
        </Text>
        <Text display={"flex"} flexDir={"row"} gap={2} alignItems={"center"}>
          <FaInstagram />
          <Text as={"span"}>Instagram</Text>
        </Text>
        <Text display={"flex"} flexDir={"row"} gap={2} alignItems={"center"}>
          <FaLinkedin />
          <Text as={"span"}>LinkedIn</Text>
        </Text>
      </VStack>
      <Text w={"100%"} textAlign={"center"}>
        © 2024 House Rental. All rights reserved.
      </Text>
    </WebsiteLayout>
  );
};

export default Footer;
