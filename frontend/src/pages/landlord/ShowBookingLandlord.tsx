import {
  Box,
  Button,
  Flex,
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
import { FaCheck, FaTimes } from "react-icons/fa";
import useUserAuthStore from "../../contexts/useUserAuthContext";
import { useBookingsForLandlord } from "../../hooks/react-query/Bookings";
import { Booking, Property, User } from "../../types";
import { useAcceptRejectBooking } from "../../hooks/react-query/Bookings";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

const ShowBookingLandlord = () => {
  const { user } = useUserAuthStore();
  const { data, isLoading } = useBookingsForLandlord(user?._id ?? "");
  const [selectedBooking] = data ?? [];

  const queryClient = useQueryClient();
  const { mutateAsync: acceptRejectBooking, isPending } =
    useAcceptRejectBooking();
  const [selectedBookingId, setSelectedBookingId] = useState<
    string | undefined
  >();

  const {
    isOpen: isAcceptOpen,
    onOpen: onAcceptOpen,
    onClose: onAcceptClose,
  } = useDisclosure();
  const {
    isOpen: isRejectOpen,
    onOpen: onRejectOpen,
    onClose: onRejectClose,
  } = useDisclosure();

  const handleAccept = async () => {
    try {
      // Accept the booking
      await acceptRejectBooking({
        bookingId: selectedBookingId ?? "", // Assuming bookingDetails._id contains the booking ID
        status: "Confirmed", // Status for accepting the booking
      });
      queryClient.invalidateQueries({
        queryKey: ["landlordBookings", user?._id],
      });
      // Close the modal
      onAcceptClose();
    } catch (error) {
      console.error("Error accepting the booking:", error);
    }
  };

  const handleReject = async () => {
    try {
      // Reject the booking
      const updatedBooking = await acceptRejectBooking({
        bookingId: selectedBookingId ?? "", // Assuming bookingDetails._id contains the booking ID
        status: "Cancelled", // Status for rejecting the booking
      });
      console.log("Booking rejected:", updatedBooking);

      // Close the modal
      onRejectClose();
    } catch (error) {
      console.error("Error rejecting the booking:", error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Booking Date</Th>
            <Th>Tenant</Th>
            <Th>Property Name</Th>
            <Th>Move In Date</Th>
            <Th>Move Out Date</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {selectedBooking && data.length > 0 ? (
            data.map((booking: Booking<User, Property>) => (
              <Tr key={booking._id}>
                <Td>
                  {new Date(booking.booking_date ?? "").toLocaleDateString()}
                </Td>
                <Td>{booking.tenant_id.name}</Td>
                <Td>{booking.property_id.name}</Td>
                <Td>{new Date(booking.move_in_date).toLocaleDateString()}</Td>
                <Td>
                  {booking.move_out_date
                    ? new Date(booking.move_out_date).toLocaleDateString()
                    : "N/A"}
                </Td>
                <Td>
                  <BookingStatus status={booking.status ?? ""} />
                </Td>
                <Td>
                  {booking.status === "Pending" && (
                    <Flex gap={2} flexWrap={"wrap"}>
                      <Button
                        colorScheme="green"
                        leftIcon={<FaCheck />}
                        onClick={() => {
                          setSelectedBookingId(booking._id);
                          onAcceptOpen();
                        }}
                      >
                        Accept
                      </Button>
                      <Button
                        colorScheme="red"
                        leftIcon={<FaTimes />}
                        onClick={() => {
                          setSelectedBookingId(booking._id);
                          onRejectOpen();
                        }}
                      >
                        Reject
                      </Button>
                    </Flex>
                  )}
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={6} textAlign="center">
                No bookings found
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
      <Modal isOpen={isAcceptOpen} onClose={onAcceptClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Acceptance</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to accept this booking?</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="green"
              onClick={handleAccept}
              isLoading={isPending}
            >
              Accept
            </Button>
            <Button variant="ghost" onClick={onAcceptClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Reject Modal */}
      <Modal isOpen={isRejectOpen} onClose={onRejectClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Rejection</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to reject this booking?</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              onClick={handleReject}
              isLoading={isPending}
            >
              Reject
            </Button>
            <Button variant="ghost" onClick={onRejectClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ShowBookingLandlord;
