import { Link, useParams } from "react-router-dom";
import Loader from "../components/common/Loader.tsx";
import { useGetPropertyById } from "../hooks/react-query/Property.tsx";
import PropertyInfo from "../components/UI/properties/propertydetails/PropertyInfo.tsx";
import {
  Button,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import useUserAuthStore from "../contexts/useUserAuthContext.tsx";
import { useGetUserById } from "../hooks/react-query/Users.tsx";

const RentalUnitDetails = () => {
  const { id: property_id } = useParams();
  const { data, isLoading, isError } = useGetPropertyById(property_id!);
  const { data: ownerData } = useGetUserById(data?.owner_id);
  // const {color, icon} = propertystatusConfig[data?.status] || {};
  const { user, isAuthenticated } = useUserAuthStore();

  console.log(ownerData);

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !data) {
    return (
      <div>Error fetching rental unit details. Please try again later.</div>
    );
  }

  if (!data) {
    return <div>Property details not available.</div>;
  }

  return (
    <VStack paddingY={"2rem"}>
      <PropertyInfo data={data} />
      <Table colorScheme="buttonColors">
        <Thead>
          <Tr>
            <Th>Property Details</Th>
            <Th>Value</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Owner</Td>
            <Td>{ownerData?.name}</Td>
          </Tr>
          <Tr>
            <Td>Property Type</Td>
            <Td>{data.property_type}</Td>
          </Tr>
          <Tr>
            <Td>Address</Td>
            <Td>{data.address}</Td>
          </Tr>
          <Tr>
            <Td>City</Td>
            <Td>{data.city}</Td>
          </Tr>
          <Tr>
            <Td>State</Td>
            <Td>{data.state}</Td>
          </Tr>
          <Tr>
            <Td>Zip Code</Td>
            <Td>{data.zip_code}</Td>
          </Tr>
          <Tr>
            <Td>Price</Td>
            <Td>Rs. {data.price}</Td>
          </Tr>
          <Tr>
            <Td>Bedrooms</Td>
            <Td>{data.number_of_bedrooms}</Td>
          </Tr>
          <Tr>
            <Td>Bathrooms</Td>
            <Td>{data.number_of_bathrooms}</Td>
          </Tr>
          <Tr>
            <Td>Floors</Td>
            <Td>{data.floors}</Td>
          </Tr>
          <Tr>
            <Td>Available</Td>
            <Td>{data.isAvailable ? "Yes" : "No"}</Td>
          </Tr>
          <Tr>
            <Td>Has Parking</Td>
            <Td>{data.hasParking ? "Yes" : "No"}</Td>
          </Tr>
          <Tr>
            <Td>Has Balcony</Td>
            <Td>{data.hasBalcony ? "Yes" : "No"}</Td>
          </Tr>
          <Tr>
            <Td>Pets Allowed</Td>
            <Td>{data.petsAllowed ? "Yes" : "No"}</Td>
          </Tr>
          <Tr>
            <Td>Created At</Td>
            <Td>{new Date(data.created_at).toLocaleString()}</Td>
          </Tr>
        </Tbody>
      </Table>

      <Button
        as={Link}
        to={
          !user?.role || user.role !== "tenant" || !isAuthenticated
            ? "/login"
            : `/properties/apply/${data._id}`
        }
        p={4}
        marginRight="auto"
      >
        Apply
      </Button>
    </VStack>
  );
};

export default RentalUnitDetails;
