import { Button, Flex, HStack, Text } from "@chakra-ui/react";
import { FaChevronLeft } from "react-icons/fa";
import { Property } from "../../../../types";
import { Link } from "react-router-dom";
import Slider from "../../../common/Slider";

const PropertyInfo = ({ data }: { data: Property }) => {
  return (
    <>
      <HStack width={"100%"} justifyContent={"space-between"}>
        <Flex gap={4} flexDir={{ base: "column", md: "row" }}>
          <Text>House Name: {data.name || "N/A"}</Text>
        </Flex>
        <Button variant={"link"} as={Link} to={`/properties`}>
          <FaChevronLeft /> Back
        </Button>
      </HStack>
      <Slider image_data={data.images} />
    </>
  );
};

export default PropertyInfo;
