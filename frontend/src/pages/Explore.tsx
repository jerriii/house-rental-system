import { useNavigate } from "react-router-dom";
import { useFetchProperties } from "../hooks/react-query/Property";
import useCustomColor from "../hooks/useCustomColor";
import Loader from "../components/common/Loader";
import { Card, CardBody, Grid, Image, Stack, Text } from "@chakra-ui/react";
import { Property } from "../types";
import { FaLocationDot } from "react-icons/fa6";

const Explore = () => {
  const { data, isError, isLoading } = useFetchProperties();
  const navigate = useNavigate();
  const { house_card_background } = useCustomColor();

  if (isLoading) return <Loader />;

  if (isError) return <div>Error: Error while fetching data</div>;

  return (
    <Stack spacing={6} padding={6}>
      <Grid
        gridTemplateColumns={{
          base: "repeat(auto-fill, minmax(260px, 1fr))",
          lg: "repeat(auto-fill, minmax(340px, 1fr))",
        }}
        gap={6}
      >
        {data.properties.map((property: Property) => (
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
              onClick={() =>
                navigate(`/properties/${property._id}`, {
                  state: { from: "/explore" },
                })
              }
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
    </Stack>
  );
};

export default Explore;
