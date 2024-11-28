import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import BookingTable from "../../components/common/BookingTable";
import PropertyTable from "../../components/common/PropertyTable";
import { Link } from "react-router-dom";
import UserTable from "../../components/common/UserTable";


const AdminHome = () => {

  return (
    <VStack alignItems={"flex-start"} py={4}>
      {/* booking details */}
      <HStack w={"100%"} justifyContent={"space-between"}>
        <Text fontSize="2xl" fontWeight="bold">
          Booking Details
        </Text>
        <Button variant={"link"} as={Link} to="/admin-bookings">
          View Bookings
        </Button>
      </HStack>
      <Box maxHeight={"300px"} w={"100%"} overflow={"auto"}>
        <BookingTable />
      </Box>

      {/* Property details */}
      <HStack w={"100%"} justifyContent={"space-between"}>
        <Text fontSize="2xl" fontWeight="bold">
          Property Details
        </Text>
        <Button variant={"link"} as={Link} to="/admin-properties">
          View Properties
        </Button>
      </HStack>
      <Box maxHeight={"300px"} w={"100%"} overflow={"auto"}>
        <PropertyTable />
      </Box>
      {/* User details */}
      <HStack w={"100%"} justifyContent={"space-between"}>
        <Text fontSize="2xl" fontWeight="bold">
          User Details
        </Text>
        <Button variant={"link"} as={Link} to="/admin-users">
          View Users
        </Button>
      </HStack>
      <Box maxHeight={"300px"} w={"100%"} overflow={"auto"}>
            <UserTable />
      </Box>
    </VStack>
  );
};

export default AdminHome;
