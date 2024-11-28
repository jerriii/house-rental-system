import {
  Button,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import useCustomColor from "../../hooks/useCustomColor";
import { FaTrash } from "react-icons/fa";
import { Property } from "../../types";
import { useFetchProperties } from "../../hooks/react-query/Property";
import { useDeletePropertyForAdmin } from "../../hooks/react-query/Property";
import Loader from "./Loader";

const PropertyTable = () => {
  const { header_background } = useCustomColor();
  const { data: PropertyData, isLoading, isError } = useFetchProperties();
  const deletePropertyMutation = useDeletePropertyForAdmin();

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <Text>Error fetching properties. Please try again later.</Text>;
  }
  return (
    <Table>
      <Thead
        bg={header_background}
        position={"sticky"}
        backdropFilter={"blur(10px)"}
        top={0}
        zIndex={1}
      >
        <Tr>
          <Th>SN.</Th>
          <Th>Property Type</Th>
          <Th>Property Name</Th>
          <Th>Location</Th>
          <Th>Price</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {PropertyData.properties.map((item: Property, index: number) => {
          return (
            <Tr key={index}>
              <Td>{index + 1}</Td>
              <Td>{item.property_type}</Td>
              <Td>{item.name ? item.name : "N/A"}</Td>
              <Td>
                {item.address}, {item.city}
              </Td>
              <Td>Rs. {item.price}/month</Td>
              <Td>
                <Button
                  colorScheme="red"
                  leftIcon={<FaTrash />}
                  onClick={() =>
                    deletePropertyMutation.mutate(item?._id ?? "", {
                      onSuccess: () => window.location.reload(),
                    })
                  }
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          );
        })}

        {!PropertyData.properties.length && (
          <Tr>
            <Td colSpan={7} textAlign="center">
              No properties found
            </Td>
          </Tr>
        )}
      </Tbody>
    </Table>
  );
};

export default PropertyTable;
