import {
  Button,
  Flex,
  Grid,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import useCustomColor from "../../hooks/useCustomColor";
import { FaCheckCircle, FaPlus } from "react-icons/fa";
import PropertiesStatus from "../../components/UI/PropertiesStatus";
import { FaAngleRight } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import useUserAuthStore from "../../contexts/useUserAuthContext";
import Loader from "../../components/common/Loader.tsx";
import {usePropertiesByOwnerId} from "../../hooks/react-query/Property.tsx";
import { Property } from "../../types/models.types.tsx";

const LandlordProperty = () => {
  const { user } = useUserAuthStore();
  const owner_id = user?._id || "";
  const navigate = useNavigate();

  // Fetch properties data according to owner_id using useQuery
  const { data, isLoading, isError } = usePropertiesByOwnerId(owner_id);
  
  const { header_background, alpha_color } = useCustomColor();
  
  if (isLoading) {
    return <Loader />;
  }
  
  if (isError) {
    /* Show error message */
    return <Text>Error fetching properties. Please try again later.</Text>;
  }
  if (!data || data.error) {
    return (  
    <HStack position={"absolute"} top={"50%"} left={"50%"} transform={"translate(-50%, -50%)"}>
      <Text>{data.error}</Text>
      <Button as={Link} to={`/add-property`} variant={"link"}>
        <FaPlus style={{ marginRight: "5px" }} />
        Add Property
      </Button>
    </HStack>
    )
  }
  return (
    <>
      <VStack gap={4} w={"100%"} h={"100%"} justifyContent={"flex-start"}>
        <Flex flexDir={"column"} gap={4} w={"100%"}>
          <Text fontWeight={"bold"}>Property Overview</Text>
          <Grid
            w={"100%"}
            gap={4}
            justifyItems="center"
            alignItems="center"
            gridTemplateColumns={"repeat(auto-fill, minmax(320px, 1fr))"}
          >
            <Flex
              bg={header_background}
              shadow="md"
              p={4}
              rounded="md"
              width="100%"
              flexDir={"column"}
              justifyContent={"center"}
            >
              <Text color="teal.500" fontWeight={"bold"}>
                <Icon as={FaCheckCircle} boxSize={6} /> Properties Owned
              </Text>
              <Text fontWeight="bold" fontSize="2xl">
                {data.length ? data.length : 0}
              </Text>{" "}
            </Flex>
          </Grid>
        </Flex>

        <Flex
          flexDir={"column"}
          bg={alpha_color}
          shadow={"md"}
          p={4}
          rounded={"md"}
          h={"max-content"}
          w={"100%"}
          height={"fit-content"}
          gap={4}
        >
          <HStack justifyContent={"space-between"}>
            <Text fontWeight={"bold"}>My Property</Text>
            <Button
              variant={"link"}
              onClick={() => {
                navigate("/add-property");
              }}
            >
              Add Property
            </Button>
          </HStack>

          <Grid height={"100%"} gap={4}>
            {/* Loop through the properties and display each */}
            {data.map((property: Property) => (
              <Flex
                p={4}
                borderWidth="1px"
                borderRadius="md"
                shadow="sm"
                width="100%"
                key={property._id}
                alignItems={"center"}
                height={"fit-content"}
              >
                <Image
                  src={`http://localhost:4200${property.images[0]}`}
                  alt={property._id}
                  borderRadius="md"
                  maxW={"100px"}
                  aspectRatio={1}
                  width="100%"
                  objectFit="cover"
                />
                <Flex direction="column" gap={2} p={2}>
                  <Text fontSize="lg" fontWeight="bold">
                    {property.property_type}
                  </Text>
                  <PropertiesStatus status={property.isAvailable} />
                  <Text>{property.address}</Text>
                </Flex>
                <Flex
                  alignItems="center"
                  p={2}
                  cursor="pointer"
                  flex={1}
                  justifyContent="flex-end"
                >
                  <Button
                    variant={"link"}
                    onClick={() => {
                      navigate(`/properties/${property._id}`);
                    }}
                  >
                    Property Details <FaAngleRight />
                  </Button>
                </Flex>
              </Flex>
            ))}
          </Grid>
        </Flex>
      </VStack>

      {/* If no properties are available */}
      {data && data.length === 0 && <Text>No properties found</Text>}
    </>
  );
};

export default LandlordProperty;
