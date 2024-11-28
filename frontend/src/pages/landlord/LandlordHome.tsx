import { Box, Flex, Text } from "@chakra-ui/react";
import useCustomColor from "../../hooks/useCustomColor";
import PropertiesCard from "../../components/UI/PropertiesCard";


// const maintenanceRequests = [
//   {
//     title: "Villa Enny Cho - Japanese Home",
//     priority: "High",
//     description: "Fixing malfunctioned appliances",
//     date: "June 12, 2022",
//     image: "https://images.pexels.com/photos/220447/pexels-photo-220447.jpeg?auto=compress&cs=tinysrgb&w=600"
//   },
//   {
//     title: "Villa Enny Cho - Japanese Home",
//     priority: "Medium",
//     description: "Plumbing maintenance",
//     date: "July 10, 2022",
//     image: "https://images.pexels.com/photos/220447/pexels-photo-220447.jpeg?auto=compress&cs=tinysrgb&w=600"
//   },
//   {
//     title: "Villa Enny Cho - Japanese Home",
//     priority: "Low",
//     description: "Gardening",
//     date: "August 15, 2022",
//     image: "https://images.pexels.com/photos/220447/pexels-photo-220447.jpeg?auto=compress&cs=tinysrgb&w=600"
//   }
// ];

// const priorityColorMap: { [key: string]: string } = {
//   High: "red.500",
//   Medium: "orange.400",
//   Low: "green.500"
// };

const LandlordHome = () => {
  const { alpha_color } = useCustomColor();
  return (
    <Flex width={"100%"} flexDir={{ base:"column",lg:"row"}} gap={2}>
      {/* right side */}
      <Flex flexDir={"column"} gap={2} w={"100%"} h={"80vh"}>
        <Flex flexDir={"column"} bg={alpha_color} shadow={"md"} p={2} rounded={"md"} gap={2} h={"80vh"}>
          <Text fontWeight={"bold"}>My Property</Text>
          <Box w={"100%"}>
            <PropertiesCard/>
          </Box>
        </Flex>
        {/* <Flex flexDir={"column"} bg={alpha_color} shadow={"md"} p={2} rounded={"md"}>
          <HStack justifyContent={"space-between"} p={2}>
          <Text fontWeight={"bold"}>
            Rental Payments
          </Text>
          <Button variant={"link"} onClick={() => {navigate("/payments")}}>View all</Button>
          </HStack>
          <RentTable />
        </Flex> */}
      </Flex>
    </Flex>
  );
};

export default LandlordHome;
