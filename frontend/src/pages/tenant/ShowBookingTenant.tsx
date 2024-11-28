import useUserAuthStore from "../../contexts/useUserAuthContext";
import { useGetBookingsForTenant } from "../../hooks/react-query/Bookings";
import { useDeleteBooking } from "../../hooks/react-query/Bookings";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import Loader from "../../components/common/Loader";
import { BookingStatus } from "../../components/UI/PropertiesStatus";
import { FaTrash } from "react-icons/fa";
import { Booking, Property, User } from "../../types";
import { useState } from "react";

const ShowBooking = () => {
  const { user } = useUserAuthStore();
  const { data, isLoading } = useGetBookingsForTenant(user?._id ?? "");
  const [deleteId, setDeleteId] = useState<string>("");

  const { mutateAsync: deleteBooking, isPending } = useDeleteBooking();

  const bookingDetails: Booking<User, Property>[] = data ?? [];

  console.log(bookingDetails);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleConfirmDelete = () => {
    deleteBooking(deleteId);
    onClose(); // Close the confirmation modal
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th px={1}>Property Name</Th>
            <Th px={1}>Property Address</Th>
            <Th>Property Type</Th>
            <Th>Move In Date</Th>
            <Th>Field Visit</Th>
            <Th>Total Rent</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {bookingDetails.length > 0 ? (
            bookingDetails.map((bookingDetails) => (
              <Tr>
                {/* <Td>
                {new Date(bookingDetails.booking_date).toLocaleDateString()}
              </Td> */}
                <Td px={1}>{bookingDetails.property_id.name}</Td>
                <Td px={1}>
                  {bookingDetails.property_id.address},{" "}
                  {bookingDetails.property_id.city}
                </Td>
                <Td>{bookingDetails.property_id.property_type}</Td>
                <Td>
                  {new Date(bookingDetails.move_in_date).toLocaleDateString()}
                </Td>
                <Td>{bookingDetails.field_visit ? "Yes" : "No"}</Td>
                <Td>{bookingDetails.total_rent}</Td>
                <Td>
                  <BookingStatus status={bookingDetails.status ?? ""} />
                </Td>
                {bookingDetails.status === "Pending" && (
                  <Td>
                    <Button
                      colorScheme="red"
                      onClick={() => {
                        onOpen();
                        setDeleteId(bookingDetails._id ?? "");
                      }}
                      leftIcon={<FaTrash />}
                    >
                      Delete
                    </Button>
                  </Td>
                )}
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={7} textAlign="center">
                No booking found
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>

      {/* Modal for delete confirmation */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete this booking?</Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              onClick={() => handleConfirmDelete()}
              isLoading={isPending}
            >
              Delete
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ShowBooking;
