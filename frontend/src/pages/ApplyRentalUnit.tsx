import {
  Button,
  Flex,
  HStack,
  Icon,
  Image,
  Input,
  Switch,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useGetPropertyById } from "../hooks/react-query/Property";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import useCustomColor from "../hooks/useCustomColor";
import Loader from "../components/common/Loader";
import PropertiesStatus from "../components/UI/PropertiesStatus";
import { FaLocationDot } from "react-icons/fa6";
import useUserAuthStore from "../contexts/useUserAuthContext";
import { useCreateBooking } from "../hooks/react-query/Bookings";

const ApplyRentalUnit = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useUserAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [viewedImage, setViewedImage] = useState("");
  const { alpha_color, house_card_background } = useCustomColor();
  const { data, isLoading, error } = useGetPropertyById(id!);
  const navigate = useNavigate();
  const { mutate: add_booking, isPending } = useCreateBooking();
  const toast = useToast();
  const [moveInDate, setMoveInDate] = useState("");
  const [moveOutDate, setMoveOutDate] = useState("");
  const [fieldVisit, setFieldVisit] = useState(false);

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <div>Error fetching property details. Please try again later.</div>;
  }

  const handleApplyRentalUnit = () => {
    if (!user || !isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "You must be logged in to apply for a rental unit.",
        status: "warning", // You can change the status to 'info', 'success', 'error', etc.
        duration: 5000, // How long the toast will be visible (in ms)
        isClosable: true, // Whether the toast can be dismissed by clicking the close button
        position: "top",
      });
      return;
    }

    // Validate required fields
    if (!moveInDate) {
      toast({
        title: "Missing Move-In Date",
        description: "Move-in date is required.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    if (!data || !data._id || !data.price) {
      toast({
        title: "Property Details Missing",
        description: "Property details are missing. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    const allData = {
      move_in_date: moveInDate,
      move_out_date: moveOutDate || null, // Optional
      field_visit: fieldVisit,
      total_rent: data.price,
      property_id: data._id,
      tenant_id: user._id || "", // Ensure user ID is not undefined
    };
    add_booking(allData, {
      onSuccess: () => {
        navigate(`/`); // Redirect after success
      },
      onError: (error) => {
        console.error("Error creating booking:", error);
      },
    });
  };

  return (
    <HStack alignItems={"flex-start"}>
      {isOpen && (
        <Flex
          position={"absolute"}
          inset={0}
          p={16}
          background={alpha_color}
          backdropFilter={"blur(10px)"}
          zIndex={20}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Button
            variant={"unstyled"}
            pos={"absolute"}
            right={"1rem"}
            top={"1rem"}
            onClick={() => setIsOpen(false)}
          >
            <FaTimes />
          </Button>
          <Image src={`${viewedImage}`} alt="house" h={"100%"} />
        </Flex>
      )}
      <VStack
        w={"400px"}
        p={5}
        alignItems={"flex-start"}
        bg={house_card_background}
        borderRadius={"md"}
      >
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1} // Default to 1 slide per view
          navigation
          pagination={{ clickable: true }}
          loop={true}
          className={"w-full"}
        >
          {data.images?.map((src: File, i: number) => (
            <SwiperSlide key={i}>
              <Image
                src={`http://localhost:4200${src}`}
                alt="house"
                width={"100%"} // Ensure the image fits the container
                objectFit={"cover"} // Make images cover the container
                aspectRatio={"16/9"}
                _hover={{ cursor: "pointer" }}
                onClick={() => {
                  setIsOpen(true);
                  setViewedImage(`http://localhost:4200${src}`);
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <Flex direction="column" gap={2} p={2}>
          <Text fontSize="lg" fontWeight="bold">
            {data.property_type}
          </Text>
        </Flex>
        <VStack justifyContent="space-between" p={2} alignItems={"flex-start"}>
          <Text>Rs.{data.price}/month</Text>
          <PropertiesStatus status={data.isAvailable} />
        </VStack>
        <Flex direction="row" alignItems={"center"} p={2}>
          <Icon as={FaLocationDot} marginRight={2} />
          <Text>{data.address}</Text>
        </Flex>
      </VStack>

      {/* Additional Details */}
      <VStack
        w={"full"}
        h={"full"}
        p={5}
        alignItems={"flex-start"}
        borderRadius={"md"}
      >
        <Text fontWeight="bold" mb={4} paddingLeft={6}>
          Property Details:
        </Text>
        <Table variant="simple" w="full">
          <Tbody>
            <Tr>
              <Td fontWeight="bold">Bedrooms:</Td>
              <Td>{data.number_of_bedrooms}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold">Bathrooms:</Td>
              <Td>{data.number_of_bathrooms}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold">Floors:</Td>
              <Td>{data.floors}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold">Parking:</Td>
              <Td>{data.hasParking ? "Available" : "Not Available"}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold">Balcony:</Td>
              <Td>{data.hasBalcony ? "Available" : "Not Available"}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold">Pets Allowed:</Td>
              <Td>{data.petsAllowed ? "Yes" : "No"}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold">Move In Date:</Td>
              <Td>
                <Input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  placeholder="Select a date"
                  value={moveInDate}
                  onChange={(e) => setMoveInDate(e.target.value)}
                />
              </Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold">
                Move Out Date:{" "}
                <Text
                  as="span"
                  fontWeight="normal"
                  fontSize="sm"
                  color="gray.500"
                >
                  (optional)
                </Text>
              </Td>
              <Td>
                <Input
                  type="date"
                  min={moveInDate || new Date().toISOString().split("T")[0]} // Prevent past dates
                  placeholder="Select a date (optional)"
                  value={moveOutDate}
                  onChange={(e) => setMoveOutDate(e.target.value)}
                />
              </Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold">Field Visit:</Td>
              <Td>
                <Switch
                  isChecked={fieldVisit}
                  onChange={() => {
                    setFieldVisit(!fieldVisit);
                  }}
                  colorScheme="buttonColors" // Customize the color scheme of the switch
                  marginRight={2}
                />
                {fieldVisit ? "Yes" : "No"}
              </Td>
            </Tr>
          </Tbody>
        </Table>
        <Button onClick={handleApplyRentalUnit} isLoading={isPending}>
          Submit
        </Button>
      </VStack>
    </HStack>
  );
};

export default ApplyRentalUnit;
