import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // General Swiper styles
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, EffectCoverflow } from "swiper/modules";
import { FaAngleRight, FaPlus } from "react-icons/fa";
import useUserAuthStore from "../../contexts/useUserAuthContext";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../common/Loader.tsx";
import { usePropertiesByOwnerId } from "../../hooks/react-query/Property.tsx";
import { Property } from "../../types/models.types.tsx";
import PropertiesStatus from "./PropertiesStatus.tsx";

const PropertiesCard = () => {
  const { user } = useUserAuthStore();
  const navigate = useNavigate();
  const ownerId = user?._id;
  const { data, isLoading, isError } = usePropertiesByOwnerId(ownerId!);

  const loadingMessage = <Loader />;
  const errorMessage = (
    <Text>Error fetching properties. Please try again later.</Text>
  );

  if (isLoading) {
    return loadingMessage;
  }
  if (isError) {
    return errorMessage;
  }

  if (data.error) {
    return (
      <HStack>
        <Text>{data.error}</Text>
        <Button
          as={Link}
          to={`/add-property`}
          variant={"link"}
          leftIcon={<FaPlus />}
        >
          Add Property
        </Button>
      </HStack>
    );
  }

  return (
    <VStack
      position="relative"
      width={"100%"}
      maxW={"400px"}
      justifyContent={"center"}
      alignItems={"center"}
      pos={"relative"}
      px={0}
      mx={"auto"}
    >
      {data && (
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1} // Makes slides adjust to their own width
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          navigation
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="mySwiper"
          style={{ width: "100%", overflow: "hidden" }}
        >
          {data.map((property: Property) => (
            <SwiperSlide
              key={property._id}
              style={{
                display: "flex",
                justifyContent: "center",
                minWidth: "390px",
              }}
            >
              <Box
                p={4}
                borderWidth="1px"
                borderRadius="md"
                shadow="sm"
                width="100%"
              >
                <Image
                  src={`http://localhost:4200${property.images[0]}`}
                  alt={`property-image-${property._id}`}
                  borderRadius="md"
                  maxW={"390px"}
                  aspectRatio={16 / 9}
                  width="100%"
                />
                <Flex direction="column" gap={2} p={2}>
                  <Text fontSize="lg" fontWeight="bold">
                    {property.property_type}
                  </Text>
                </Flex>
                <VStack
                  justifyContent="space-between"
                  p={2}
                  alignItems={"flex-start"}
                >
                  <Text>Rs. {property.price}/month</Text>
                  <PropertiesStatus status={property.isAvailable} />
                </VStack>
                <Flex direction="column" p={2}>
                  <Text>{property.address}</Text>
                </Flex>
                <Flex alignItems="center" p={2} cursor="pointer">
                  <Button
                    variant="link"
                    onClick={() =>
                      navigate(`/landlord-properties/${property._id}`)
                    }
                  >
                    Property Details <FaAngleRight />
                  </Button>
                </Flex>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </VStack>
  );
};

export default PropertiesCard;
