import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import useUserAuthStore from "../contexts/useUserAuthContext.tsx";
import { FaEdit, FaPlus } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import Loader from "../components/common/Loader.tsx";
import { useGetUserById, useUpdateUserProfile } from "../hooks/react-query/Users.tsx";
import useCustomColor from "../hooks/useCustomColor.tsx";

const Profile = () => {
  const { user, isAuthenticated } = useUserAuthStore();
  const { data, isLoading, isError } = useGetUserById(user?._id || "");
  const { alpha_color, house_card_background } = useCustomColor();
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Reference to the file input
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const updatemutation = useUpdateUserProfile();
  const [image, setImage] = useState("/profilepicturedefault.png");

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        address: data.address || "",
      });
      setImage(data.image || "/profilepicturedefault.png");
    }
  }, [data]);

  if (!isAuthenticated) {
    return <Text>You are not logged in</Text>; // Handle the case where the user is not authenticated
  }

  const handleSubmit = () => {
    const allData = { ...formData, image };
    console.log(allData);
    
    // updatemutation.mutate({ id: user?._id || "", updateData: {...formData, image} });
    setIsFormOpen(false); // Close modal on successful update
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setImage(reader.result as string); // Set the selected image URL
        }
      };
      reader.readAsDataURL(file); // Read the file as data URL
    }
  };

  const handleCameraUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input click action programmatically
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Text>Something went wrong</Text>;
  }

  return (
    <VStack h={"100vh"} justifyContent={"center"} alignItems={"center"}>
      <VStack bg={house_card_background} p={4} rounded={"md"}>
      <VStack align="center" spacing={4} >
        {isFormOpen && (
          <VStack
            spacing={4}
            position={"absolute"}
            inset={0}
            bg={alpha_color}
            justifyContent={"center"}
            alignItems={"center"}
            backdropFilter={"blur(10px)"}
            zIndex={20}
          >
            <Button
              onClick={() => setIsFormOpen(!isFormOpen)}
              pos={"absolute"}
              right={"1rem"}
              top={"1rem"}
              variant={"ghost"}
            >
              Close
            </Button>
            <Flex flexDir={"column"} gap={4} bg={house_card_background} p={4} rounded={"md"}>
              <Box position={"relative"} mb={4}>
                <Image
                  src={image}
                  alt="Profile"
                  objectFit={"cover"}
                  borderRadius="100%"
                  maxWidth="200px"
                  aspectRatio="1/1"
                />
                <Button
                  position="absolute"
                  zIndex={30}
                  bottom={6}
                  right={6}
                  p={0}
                  borderRadius="100%"
                  onClick={handleCameraUpload}
                >
                  <FaPlus />
                </Button>
              </Box>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
              <Input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <Input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <Input
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
              <Button
                w="100%"
                leftIcon={<Icon as={FaEdit} />}
                onClick={handleSubmit}
              >
                Save Changes
              </Button>
            </Flex>
          </VStack>
        )}
        <Flex position="relative">
          <Image
            src={image}
            alt="Profile"
            objectFit={"cover"}
            borderRadius="100%"
            maxWidth="200px"
            aspectRatio="1/1"
          />
        </Flex>
      </VStack>
      <VStack
        marginLeft={12}
        justifyContent={"flex-start"}
        alignItems={"flex-start"}
      >
        <Text fontWeight={"bold"}>Name: {data?.name || "N/A"}</Text>
        <Text fontWeight={"bold"}>Email: {data?.email || "N/A"}</Text>
        <Text fontWeight={"bold"}>Phone: {data?.phone || "N/A"}</Text>
        <Text fontWeight={"bold"}>Address: {data?.address || "N/A"}</Text>
        <Button
          onClick={() => setIsFormOpen(!isFormOpen)}
          leftIcon={<Icon as={FaEdit} />}
        >
          Edit
        </Button>
      </VStack>
      </VStack>
    </VStack>
  );
};

export default Profile;
