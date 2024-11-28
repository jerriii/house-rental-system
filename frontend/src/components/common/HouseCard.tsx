import { Card, CardBody, Flex, HStack, Image, Skeleton, Stack, Text} from "@chakra-ui/react";
import useCustomColor from "../../hooks/useCustomColor";
import { HouseCardProps } from "../../types";
import { useNavigate } from "react-router-dom";
import React from "react";
import {FaLocationDot} from "react-icons/fa6";
import RoomSVG from "../../assets/svg/RoomSVG.tsx";

const HouseCard = React.forwardRef<HTMLDivElement, HouseCardProps>(({ cardData,loading, ...rest }: HouseCardProps, ref) => {
  const { house_card_background } = useCustomColor();
  const navigate = useNavigate();
  const cardImage = cardData.images[0];

  return (
    // card layout with image and details
    <Card ref={ref} background={house_card_background} borderRadius={"xl"} {...rest} className={"shadow-lg"} >
      {/* card body */}
      <CardBody padding={0} _hover={{cursor: "pointer"}} onClick={() => navigate(`/properties/${cardData._id}`)} >
        {/* image ambient light */}
        <Skeleton isLoaded={!loading}>
        <Image
          src={`http://localhost:4200${cardImage}`}
          alt={`image ${cardData._id}`}
          loading="lazy"
          w={"100%"}
          top={0}
          left={0}
          right={0}
          padding={6}
          pos={"absolute"}
          aspectRatio={"5/4"}
          filter={"blur(1rem)"}
        />
        {/* displayed image */}
        <Image
          src={`http://localhost:4200${cardImage}`}
          alt={`image ${cardData._id}`}
          pos={"relative"}
          w={"100%"}
          aspectRatio={"5/4"}
          inset={0}
          padding={6}
          zIndex={1}
        />
        </Skeleton>

        {/* details */}
        <Stack spacing="3" px={6} pb={6}>
          <Text fontSize={"2xl"}>
            Rs. {cardData.price}/month
          </Text>
          <Text>{cardData.property_type}</Text>
          <Text display={"flex"} flexWrap={"nowrap"} alignItems={"center"} gap={2}><FaLocationDot/> {cardData.address}</Text>
          <HStack flexWrap={"nowrap"} justifyContent={"flex-start"} alignItems={"flex-start"}>
            <RoomSVG/>
            <Flex flexWrap={"wrap"} gap={2}>
              <Text display={"flex"} flexDir={"row"} flexWrap={"nowrap"}> {cardData.number_of_bedrooms} Bedrooms</Text>
              <Text>{cardData.number_of_bathrooms} Bathrooms</Text>
            </Flex>
          </HStack>
        </Stack>
      </CardBody>
    </Card>
  );
});

export default HouseCard;
