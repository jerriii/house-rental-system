import {
  Box,
  Button,
  HStack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { useFetchProperties } from "../../hooks/react-query/Property";
import useCustomColor from "../../hooks/useCustomColor";
import Loader from "../../components/common/Loader";
import { Property } from "../../types";
import { useDeletePropertyForAdmin } from "../../hooks/react-query/Property";

const AdminProperties = () => {
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
    <>
      <HStack w={"100%"} justifyContent={"space-between"}>
        <Text fontSize="2xl" fontWeight="bold">
          Property Details
        </Text>
      </HStack>
      <Box maxHeight={"100vh"} w={"100%"} overflow={"auto"}>
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
              <Th>Tenant Name</Th>
              <Th>Property Name</Th>
              <Th>Property Address</Th>
              <Th>Move In Date</Th>
              <Th>Status</Th>
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
                  <Td>{item.address}</Td>
                  <Td></Td>
                  <Td></Td>
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
      </Box>
    </>
  );
};

export default AdminProperties;
