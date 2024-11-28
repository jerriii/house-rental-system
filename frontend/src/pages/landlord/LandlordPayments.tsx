import { Box, Flex, Grid, Icon, Table, Tbody, Td, Text, Th, Thead, Tr, VStack } from '@chakra-ui/react'
import useCustomColor from '../../hooks/useCustomColor'
import RentalStatus from '../../components/UI/RentalStatus';
import { FaCheckCircle, FaExclamationTriangle, FaMoneyCheckAlt } from 'react-icons/fa';
import { FaBan, FaRegHourglass } from 'react-icons/fa6';

const items = [
    { id: 1, property: "Laptop", price: 999.99, time: "1 Month", due_date: "1/1/2023", status: "Pending" },
    { id: 2, property: "Coffee Maker", price: 49.99, time: "1 Month", due_date: "1/1/2023", status: "Paid" },
    { id: 3, property: "Desk Chair", price: 150.0, time: "1 Month", due_date: "1/1/2023", status: "Overdue" },
    { id: 4, property: "Smartphone", price: 799.99, time: "1 Month", due_date: "1/1/2023", status: "PartiallyPaid" },
    { id: 5, property: "Headphones", price: 199.99, time: "1 Month", due_date: "1/1/2023", status: "Expired" },
];

const LandlordPayments = () => {
    const { header_background, alpha_color } = useCustomColor();
    // Calculate the count for each status
    const statusCounts = items.reduce((acc, item) => {
        acc[item.status] = (acc[item.status] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return (
        <VStack gap={4} w={"100%"} h={"100%"} justifyContent={"flex-start"}>
            <Flex flexDir={"column"} gap={4} w={"100%"}>
                <Text fontWeight={"bold"}>Payment Overview</Text>
                <Grid w={"100%"} gap={4} justifyItems="center" alignItems="center" gridTemplateColumns={"repeat(auto-fill, minmax(320px, 1fr))"}>
                    <Flex bg={header_background} shadow="md" p={4} rounded="md" width="100%" flexDir={"column"} justifyContent={"center"}>
                        <Text color="teal.500" fontWeight={"bold"}>< Icon as={FaCheckCircle} boxSize={6} /> Total Paid</Text>
                        <Text fontWeight="bold" fontSize="2xl">{statusCounts["Paid"] || 0}</Text>
                    </Flex>

                    {/* Pending */}
                    <Flex bg={header_background} shadow="md" p={4} rounded="md" width="100%" flexDir={"column"} justifyContent={"center"}>
                        <Text color="yellow.400" fontWeight={"bold"}><Icon as={FaRegHourglass} boxSize={6} /> Total Pending</Text>
                        <Text fontWeight="bold" fontSize="2xl">{statusCounts["Pending"] || 0}</Text>
                    </Flex>

                    {/* Overdue */}
                    <Flex bg={header_background} shadow="md" p={4} rounded="md" width="100%" flexDir={"column"} justifyContent={"center"}>
                        <Text color="orange.500" fontWeight={"bold"}><Icon as={FaExclamationTriangle} boxSize={6} /> Total Overdue</Text>
                        <Text fontWeight="bold" fontSize="2xl">{statusCounts["Overdue"] || 0}</Text>
                    </Flex>

                    {/* Partially Paid */}
                    <Flex bg={header_background} shadow="md" p={4} rounded="md" width="100%" flexDir={"column"} justifyContent={"center"}>
                        <Text color="blue.500" fontWeight={"bold"}><Icon as={FaMoneyCheckAlt} boxSize={6} /> Total Partially Paid</Text>
                        <Text fontWeight="bold" fontSize="2xl">{statusCounts["PartiallyPaid"] || 0}</Text>
                    </Flex>

                    {/* Expired */}
                    <Flex bg={header_background} shadow="md" p={4} rounded="md" width="100%" flexDir={"column"} justifyContent={"center"}>

                        <Text color="red.500" fontWeight={"bold"}><Icon as={FaBan} boxSize={6} /> Total Expired</Text>
                        <Text fontWeight="bold" fontSize="2xl">{statusCounts["Expired"] || 0}</Text>
                    </Flex>
                </Grid>
            </Flex>
            <Flex flexDir={"column"} bg={alpha_color} shadow={"md"} p={4} rounded={"md"} h={"max-content"} w={"100%"} height={"100%"} gap={4}>
                <Text fontWeight={"bold"}>
                    Rental Payments
                </Text>

                {/* Payments Table */}
                <Box overflow="auto" width="100%">
                    <Table size="sm" variant="outline" overflow={"auto"}>
                        <Thead position={"sticky"} top="0" bg="white" zIndex="1" background={alpha_color} backdropFilter={"blur(10px)"}>
                            <Tr>
                                <Th>Property</Th>
                                <Th>Duration</Th>
                                <Th>Due Date</Th>
                                <Th>Price</Th>
                                <Th >Status</Th>

                            </Tr>
                        </Thead>
                        {
                            items.length === 0 ? (
                                <Tbody>
                                    <Tr>
                                        <Td colSpan={5} textAlign={"center"}>No Payments Found</Td>
                                    </Tr>
                                </Tbody>
                            ) : (
                                <Tbody>
                                    {items.map((item) => (
                                        <Tr key={item.id}>
                                            <Td>{item.property}</Td>
                                            <Td>{item.time}</Td>
                                            <Td>{item.due_date}</Td>
                                            <Td>{item.price}</Td>
                                            <Td ><RentalStatus status={item.status} /></Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            )
                        }

                    </Table>
                </Box>
            </Flex>
        </VStack>
    )
}

export default LandlordPayments