import { Icon, Text } from "@chakra-ui/react";
import { FaHome } from "react-icons/fa";
import { rentalStatusConfig } from "./UIconfig";

// Define the status configuration
// Define the rental status configuration

const RentalStatus = ({status}:{status:string}) => {
    const { color, icon } = rentalStatusConfig[status] || { color: "gray.500", icon: FaHome }; // Default to gray if status is not found

    return (
      <Text color={color} fontWeight="bold" display="flex" alignItems="center" _hover={{ cursor: "pointer" }} wordBreak="break-word">
        <Icon as={icon} mr={2} /> {status}
      </Text>
    );
  };


export default RentalStatus;