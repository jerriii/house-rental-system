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
import { Booking, Property, User } from "../../types";
import { BookingStatus } from "../UI/PropertiesStatus";
import { FaTrash } from "react-icons/fa";
import { useGetAllBookingsForAdmin } from "../../hooks/react-query/Bookings";
import useCustomColor from "../../hooks/useCustomColor";
import Loader from "./Loader";
import { useDeleteBooking } from "../../hooks/react-query/Bookings";

const BookingTable = () => {
  const { data: BookingData, isLoading, isError } = useGetAllBookingsForAdmin();
  const { header_background } = useCustomColor();
  const deleteBookingMutation = useDeleteBooking();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Text>Error fetching Bookings. Please try again later.</Text>;
  }
  return (
    <Table variant="simple">
      <Thead bg={header_background} position="sticky" top={0} zIndex={1}>
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
        {BookingData.map((item: Booking<User, Property>, index: number) => (
          <Tr key={index}>
            <Td>{index + 1}</Td>
            <Td>{item.tenant_id.name}</Td>
            <Td>{item.property_id.name}</Td>
            <Td>{item.property_id.address}</Td>
            <Td>
              {item?.move_in_date
                ? new Date(item.move_in_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "N/A"}
            </Td>
            <Td>
              <BookingStatus status={item?.status as string} />
            </Td>
            <Td>
              <Button
                colorScheme="red"
                leftIcon={<FaTrash />}
                onClick={() =>
                  deleteBookingMutation.mutate(item?._id ?? "", {
                    onSuccess: () => window.location.reload(),
                  })
                }
              >
                Delete
              </Button>
            </Td>
          </Tr>
        ))}

        {!BookingData.length && (
          <Tr>
            <Td colSpan={7} textAlign="center">
              No Bookings found
            </Td>
          </Tr>
        )}
      </Tbody>
    </Table>
  );
};

export default BookingTable;
