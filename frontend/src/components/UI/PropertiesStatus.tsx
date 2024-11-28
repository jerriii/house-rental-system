import { Text, Icon } from "@chakra-ui/react";
import { bookingStatusConfig, propertyavailableConfig } from "./UIconfig";
import { FaHome } from "react-icons/fa";

// Usage example
const PropertiesStatus = ({ status }:{ status:boolean}) => {
  const availability = status ? "Available" : "Unavailable";
  const { color, icon } = propertyavailableConfig[availability] || {};
  
  return (
    <Text color={color} fontWeight="bold" display="flex" alignItems="center" _hover={{ cursor: "pointer" }} wordBreak={"break-word"}>
      <Icon as={icon} mr={2} /> {availability}
    </Text>
  );
};

export const BookingStatus = ({ status }:{ status:string}) => {
  const { color, icon } = bookingStatusConfig[status] || { color: "gray.500", icon: FaHome }; // Default to gray if status is not found

  return (
    <Text color={color} fontWeight="bold" display="flex" alignItems="center" _hover={{ cursor: "pointer" }} wordBreak="break-word">
      <Icon as={icon} mr={2} /> {status}
    </Text>
  );
};

export default PropertiesStatus;
