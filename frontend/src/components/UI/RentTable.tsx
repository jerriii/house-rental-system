import { Box, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import RentalStatus from './RentalStatus';
import useCustomColor from '../../hooks/useCustomColor';

const items = [
  { id: 1, property: "Laptop", price: 999.99, time: "1 Month", due_date: "1/1/2023", status: "Pending" },
  { id: 2, property: "Coffee Maker", price: 49.99, time: "1 Month", due_date: "1/1/2023", status: "Paid" },
  { id: 3, property: "Desk Chair", price: 150.0, time: "1 Month", due_date: "1/1/2023", status: "Overdue" },
  { id: 4, property: "Smartphone", price: 799.99, time: "1 Month", due_date: "1/1/2023", status: "PartiallyPaid" },
  { id: 5, property: "Headphones", price: 199.99, time: "1 Month", due_date: "1/1/2023", status: "Expired" },
];



const RentTable = () => {
  const {alpha_color} = useCustomColor();
  return (
    <Box overflow="auto" width="100%" maxH={"108px"}>
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
        <Tbody>
          {items.map((item) => (
            <Tr key={item.id}>
              <Td>{item.property}</Td>
              <Td>{item.time}</Td>
              <Td>{item.due_date}</Td>
              <Td>{item.price}</Td>
              <Td ><RentalStatus status={item.status}/></Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}

export default RentTable