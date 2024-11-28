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
import useCustomColor from "../../hooks/useCustomColor";
import { useGetUsersForAdmin } from "../../hooks/react-query/Users";
import Loader from "../../components/common/Loader";
import { User } from "../../types";
import { FaTrash } from "react-icons/fa";
import { useDeleteUser } from "../../hooks/react-query/Users";

const AdminUsers = () => {
  const { data: UserData, isLoading, isError } = useGetUsersForAdmin();
  const deleteUserMutation = useDeleteUser();
  const { header_background } = useCustomColor();
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
          User Details
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
            {UserData.map((item: User, index: number) => {
              return (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>{item.role}</Td>
                  <Td>{item.name ? item.name : "N/A"}</Td>
                  <Td>{item.address}</Td>
                  <Td></Td>
                  <Td></Td>
                  <Td>
                    <Button
                      colorScheme="red"
                      leftIcon={<FaTrash />}
                      onClick={() =>
                        deleteUserMutation.mutate(item?._id ?? "", {
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

            {!UserData.length && (
              <Tr>
                <Td colSpan={7} textAlign="center">
                  No users found
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>
    </>
  );
};

export default AdminUsers;
