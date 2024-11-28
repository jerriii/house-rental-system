import PropertyDescription from "../../components/UI/properties/propertydetails/PropertyDescription";
import PropertyInfo from "../../components/UI/properties/propertydetails/PropertyInfo";
import { Text } from "@chakra-ui/react";
import Loader from "../../components/common/Loader";
import { useParams } from "react-router-dom";
import { useGetPropertyById } from "../../hooks/react-query/Property";

const PropertyDetailsLandlord = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetPropertyById(id!);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <Text>Error fetching property details. Please try again later.</Text>
    );
  }
  if (!data) {
    return <Text>No property details available.</Text>;
  }

  return (
    <>
      {data && (
        <>
          <PropertyInfo data={data} />
          <PropertyDescription data={data} />
        </>
      )}
    </>
  );
};

export default PropertyDetailsLandlord;
