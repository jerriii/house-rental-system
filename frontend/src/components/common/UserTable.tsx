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
import { useGetUsersForAdmin } from "../../hooks/react-query/Users";
import useCustomColor from "../../hooks/useCustomColor";
import { User } from "../../types";
import { FaTrash } from "react-icons/fa";
import { useDeleteUser } from "../../hooks/react-query/Users";
import Loader from "./Loader";

const UserTable = () => {
  const { data: UserData, isLoading, isError } = useGetUsersForAdmin();
  const { header_background } = useCustomColor();
  const deleteUserMutation = useDeleteUser();

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <Text>Error fetching properties. Please try again later.</Text>;
  }
  return (
    <Table variant="simple" height={1 / 3} overflow={"auto"}>
      <Thead bg={header_background} position="sticky" top={0} zIndex={1}>
        <Tr>
          <Th>SN.</Th>
          <Th>Name</Th>
          <Th>Email</Th>
          <Th>Address</Th>
          <Th>Phone</Th>
          <Th>Role</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {UserData.map((item: User, index: number) => {
          return (
            <Tr key={index}>
              <Td>{index + 1}</Td>
              <Td>{item.name}</Td>
              <Td>{item.email}</Td>
              <Td>{item.address}</Td>
              <Td>{item.phone}</Td>
              <Td>{item.role}</Td>
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
  );
};

export default UserTable;
