import {
  Button,
  HStack,
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
  Th,
  Thead,
  Tr,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Property } from "../../../../types";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDeleteProperty } from "../../../../hooks/react-query/Property";
const PropertyDescription = ({ data }: { data: Property }) => {
  const navigate = useNavigate();
  const { mutate: deleteProperty, isPending: isDeleting } = useDeleteProperty();

  const handleDelete = () => {
    deleteProperty(data._id);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this item? This action cannot be
            undone.
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={handleDelete}
              isLoading={isDeleting}
            >
              Delete
            </Button>
            <Button
              colorScheme="buttonColors"
              mr={3}
              onClick={onClose}
              variant={"ghost"}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <VStack alignItems={"flex-start"}>
        <Table colorScheme="buttonColors">
          <Thead>
            <Tr>
              <Th>Property Details</Th>
              <Th>Value</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Property Type</Td>
              <Td>{data.property_type}</Td>
            </Tr>
            <Tr>
              <Td>Address</Td>
              <Td>{data.address}</Td>
            </Tr>
            <Tr>
              <Td>City</Td>
              <Td>{data.city}</Td>
            </Tr>
            <Tr>
              <Td>State</Td>
              <Td>{data.state}</Td>
            </Tr>
            <Tr>
              <Td>Zip Code</Td>
              <Td>{data.zip_code}</Td>
            </Tr>
            <Tr>
              <Td>Price</Td>
              <Td>Rs. {data.price}/month</Td>
            </Tr>
            <Tr>
              <Td>Bedrooms</Td>
              <Td>{data.number_of_bedrooms}</Td>
            </Tr>
            <Tr>
              <Td>Bathrooms</Td>
              <Td>{data.number_of_bathrooms}</Td>
            </Tr>
            <Tr>
              <Td>Floors</Td>
              <Td>{data.floors}</Td>
            </Tr>
            <Tr>
              <Td>Available</Td>
              <Td>{data.isAvailable ? "Yes" : "No"}</Td>
            </Tr>
            <Tr>
              <Td>Has Parking</Td>
              <Td>{data.hasParking ? "Yes" : "No"}</Td>
            </Tr>
            <Tr>
              <Td>Has Balcony</Td>
              <Td>{data.hasBalcony ? "Yes" : "No"}</Td>
            </Tr>
            <Tr>
              <Td>Pets Allowed</Td>
              <Td>{data.petsAllowed ? "Yes" : "No"}</Td>
            </Tr>
            <Tr>
              <Td>Created At</Td>
              <Td>{new Date(data.created_at).toLocaleString()}</Td>
            </Tr>
          </Tbody>
        </Table>
        <HStack marginY={4} spacing={4} justifyContent="flex-start">
          <Button
            leftIcon={<FaEdit />}
            onClick={() => navigate(`/properties/edit/${data._id}`)}
          >
            Update
          </Button>
          <Button
            leftIcon={<FaTrashAlt />}
            colorScheme="red"
            onClick={() => onOpen()}
          >
            Delete
          </Button>
        </HStack>
      </VStack>
    </>
  );
};

export default PropertyDescription;
