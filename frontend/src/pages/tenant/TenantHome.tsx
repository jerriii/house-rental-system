import { Button, Card, CardBody, Grid, Image, Stack, Text } from "@chakra-ui/react";
import Loader from "../../components/common/Loader.tsx";
import useCustomColor from "../../hooks/useCustomColor.tsx";
import { useNavigate } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import {useFetchProperties} from "../../hooks/react-query/Property.tsx";
import { Property } from "../../types/models.types.tsx";
import useUserAuthStore from "../../contexts/useUserAuthContext.tsx";
import { useRecommendedProperties } from "../../hooks/react-query/Property.tsx";
import React from "react";

const TenantHome = () => {
  // Fetch rental units and properties
  const {user} = useUserAuthStore();
  const { data, isError, isLoading } = useFetchProperties();
  const navigate = useNavigate();
  const { house_card_background } = useCustomColor();

  const {data:recommendedData, isError:isRecommendedError, isLoading:isRecommendedLoading} = useRecommendedProperties(user?._id??"");
   // State to toggle between recommended and all properties
  const [showRecommended, setShowRecommended] = React.useState(true);

  
  // Show loading indicator while fetching data
  if (isLoading || isRecommendedLoading) return <Loader />;

  // Handle errors
  if (isError || isRecommendedError) return <div>Error: Error while fetching data</div>;

  // Render properties if everything is loaded
  const propertiesToDisplay = showRecommended ? recommendedData.recommendedProperties : data?.properties;


  // Render properties if everything is loaded
  return (<>

    <Stack spacing={6} padding={6}>
    <Button
          position={"fixed"}
          bottom={"1rem"}
          right={"5rem"}
          zIndex={10}
          onClick={() => setShowRecommended(!showRecommended)}
          mb={4}
        >
          {showRecommended ? "Explore All" : "View Recommended"}
        </Button>
      <Grid
        gridTemplateColumns={{
          base: "repeat(auto-fill, minmax(260px, 1fr))",
          lg: "repeat(auto-fill, minmax(340px, 1fr))",
        }}
        gap={6}
      >
        {propertiesToDisplay?.map((property: Property) => (
          <Card
            background={house_card_background}
            borderRadius={"xl"}
            key={property._id}
            className="shadow-lg"
            gridTemplateRows={"auto"}
            justifyContent={"center"}
          >
            {/* card body */}
            <CardBody
              padding={0}
              onClick={() => navigate(`/properties/${property._id}`)}
              _hover={{ cursor: "pointer" }}
            >
              {/* image ambient light */}
              <Image
                src={`http://localhost:4200${property.images[0]}`}
                alt={`image ${property._id}`}
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
                src={`http://localhost:4200${property.images[0]}`}
                alt={`image ${property._id}`}
                pos={"relative"}
                w={"100%"}
                aspectRatio={"5/4"}
                inset={0}
                padding={6}
                zIndex={1}
              />

              {/* details */}
              <Stack spacing="3" px={6} pb={6}>
                <Text fontSize={"2xl"}>Rs. {property.price}/month</Text>
                <Text>{property.name}</Text>
                <Text>{property.property_type}</Text>
                <Text
                  display={"flex"}
                  flexWrap={"nowrap"}
                  alignItems={"center"}
                  gap={2}
                >
                  <FaLocationDot /> {property.address}
                </Text>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </Grid>
    </Stack></>
  );
};

export default TenantHome;

