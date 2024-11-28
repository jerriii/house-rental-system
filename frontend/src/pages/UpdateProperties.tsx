import React from "react";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  VStack,
  Image,
  HStack,
  Text,
  useToast,
  Box,
  Textarea,
  Select,
  Radio,
  RadioGroup,
  FormHelperText,
  Switch,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FieldError, FieldErrorsImpl, Merge, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaChevronLeft, FaTimes } from "react-icons/fa";
import {
  useGetPropertyById,
  useUpdateProperty,
} from "../hooks/react-query/Property";
import { Property } from "../types";
import { useQueryClient } from "@tanstack/react-query";
// import { FormFields } from "./AddProperties";

export interface UpdateFormFields {
  owner_id: string; // ObjectId of the user who owns the property (refers to the 'User' model)
  name?: string; // Optional property name
  description?: string; // Optional property description
  property_type: string; // Type of the property (e.g., house, apartment)
  address: string; // Property address
  city: string; // City where the property is located
  state: string; // State where the property is located
  zip_code: number; // Postal code (Zip code)
  price: number; // Property price (numeric)
  number_of_bedrooms: number; // Number of bedrooms
  number_of_bathrooms: number; // Number of bathrooms
  floors: number; // Number of floors in the property
  images: File[]; // Array of image URLs
  isAvailable: boolean;
  hasParking: boolean; // Whether the property has parking
  hasBalcony: boolean; // Whether the property has a balcony
  petsAllowed: boolean;
  existing_images: File[]; // For new image uploads
  new_images: File[];
}

const UpdateProperties = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { id: propertyId } = useParams<{ id: string }>();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<UpdateFormFields>();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]); // For new image previews
  const [isAvailable, setAvailable] = useState(false);
  const [hasParking, sethasParking] = useState(false);
  const [hasBalcony, sethasBalcony] = useState(false);
  const [petsAllowed, setPetsAllowed] = useState(false);
  // Fetch existing property data
  const { data: propertyData, isLoading } = useGetPropertyById(propertyId!);
  const [existingImages, setExistingImages] = useState<File[]>([]); // Existing image URLs
  const [newImages, setNewImages] = useState<File[]>([]);

  //define update mutation
  const { mutate: updateProperty, isPending } = useUpdateProperty();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (propertyData) {
      setValue("owner_id", propertyData.owner_id); // Set owner_id
      setValue("name", propertyData.name || ""); // Set optional property name
      setValue("description", propertyData.description || ""); // Set optional description
      setValue("property_type", propertyData.property_type); // Set property type
      setValue("address", propertyData.address); // Set address
      setValue("city", propertyData.city); // Set city
      setValue("state", propertyData.state); // Set state
      setValue("zip_code", propertyData.zip_code); // Set zip code
      setValue("price", propertyData.price); // Set price
      setValue("number_of_bedrooms", propertyData.number_of_bedrooms); // Set number of bedrooms
      setValue("number_of_bathrooms", propertyData.number_of_bathrooms); // Set number of bathrooms
      setValue("floors", propertyData.floors); // Set number of floors
      setAvailable(propertyData.isAvailable);
      sethasParking(propertyData.hasParking);
      sethasBalcony(propertyData.hasBalcony);
      setPetsAllowed(propertyData.petsAllowed);
      // Set existing images
      setExistingImages(propertyData.images ? propertyData.images : []);
      // Set new images to an empty array initially (if applicable)
      setValue("new_images", []);
    }
  }, [propertyData, setValue]);

  const getErrorMessage = (
    error: FieldError | Merge<FieldError, FieldErrorsImpl<Property>> | undefined
  ) => (error ? String(error.message) : "");

  // Delete image function
  const handleDeleteExistingImages = (index: number) => {
    const newImages = [...existingImages];
    newImages.splice(index, 1); // Remove the image at the given index
    setExistingImages(newImages); // Update the state with the new images
  };

  const handleDeleteNewImages = (index: number) => {
    // Remove the image at the specified index from both newImages and imagePreviews
    setNewImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => {
      // Revoke the object URL to free up memory
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFilesArray = Array.from(files);

      // Create URLs for preview
      const newUrls = newFilesArray.map((file) => URL.createObjectURL(file));
      setNewImages((prev) => [...prev, ...files]); // Add new files
      setImagePreviews((prev) => [...prev, ...newUrls]); // Save previews
    }
  };

  const formSubmit = async (data: UpdateFormFields) => {
    try {
      // Clean up preview URLs
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));

      // Combine all data into a single object
      const allData = {
        ...data,
        existing_images: existingImages,
        new_images: newImages,
        isAvailable: isAvailable !== undefined ? isAvailable : false,
        hasParking,
        hasBalcony,
        petsAllowed,
      };

      // Await the mutation
      updateProperty({ propertyId: propertyId!, propertyData: allData });

      // Show success toast on successful mutation
      toast({
        title: "Property updated successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      reset();
      queryClient.invalidateQueries({ queryKey: ["property", propertyId] });
      navigate(`/landlord-properties/${propertyId}`);
    } catch (error) {
      // Handle and display error toast if mutation fails
      toast({
        title: "Failed to update property",
        description:
          error instanceof Error ? error.message : "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  if (isLoading) {
    return <Text>Loading property data...</Text>;
  }

  if (!propertyData) {
    return <Text>No property data available</Text>;
  }

  return (
    <>
      <Button
        as={Link}
        to={`/properties/${propertyId}`}
        leftIcon={<FaChevronLeft />}
        marginLeft={"auto"}
        variant={"link"}
      >
        Back
      </Button>
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="py-4"
        encType="multipart/form-data"
      >
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors?.property_type} isRequired>
            <FormLabel htmlFor="property_type">Property Type</FormLabel>
            <Select
              id="property_type"
              placeholder="Select Property Type"
              {...register("property_type", { required: "This is required" })}
            >
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Condominium">Condominium (Condo)</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Studio">Studio</option>
            </Select>
            <FormErrorMessage>
              {getErrorMessage(errors.property_type)}
            </FormErrorMessage>
          </FormControl>

          {/* Property Name */}
          <FormControl isInvalid={!!errors?.name}>
            <FormLabel htmlFor="name">Property Name</FormLabel>
            <Input
              id="name"
              placeholder="Property Name"
              {...register("name")}
            />
            <FormErrorMessage>
              {errors?.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>

          {/* Property Description */}
          <FormControl isInvalid={!!errors?.description}>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Textarea
              id="description"
              placeholder="Property Description"
              {...register("description")}
            />
            <FormErrorMessage>
              {errors?.description && errors.description.message}
            </FormErrorMessage>
          </FormControl>

          {/* Address */}
          <FormControl isInvalid={!!errors?.address} isRequired>
            <FormLabel htmlFor="address">Address</FormLabel>
            <Input
              id="address"
              placeholder="Address"
              {...register("address", { required: "This is required" })}
            />
            <FormErrorMessage>
              {errors?.address && errors.address.message}
            </FormErrorMessage>
          </FormControl>

          {/* City */}
          <FormControl isInvalid={!!errors?.city} isRequired>
            <FormLabel htmlFor="city">City</FormLabel>
            <Input
              id="city"
              placeholder="City"
              {...register("city", { required: "This is required" })}
            />
            <FormErrorMessage>
              {errors?.city && errors.city.message}
            </FormErrorMessage>
          </FormControl>

          {/* State */}
          <FormControl isInvalid={!!errors?.state} isRequired>
            <FormLabel htmlFor="state">State</FormLabel>
            <Input
              id="state"
              placeholder="State"
              {...register("state", { required: "This is required" })}
            />
            <FormErrorMessage>
              {errors?.state && errors.state.message}
            </FormErrorMessage>
          </FormControl>

          {/* Zip Code */}
          <FormControl isInvalid={!!errors?.zip_code} isRequired>
            <FormLabel htmlFor="zip_code">Zip Code</FormLabel>
            <Input
              id="zip_code"
              type="number"
              placeholder="Zip Code"
              {...register("zip_code", {
                required: "This is required",
                minLength: { value: 5, message: "Zip Code should be 5 digits" },
              })}
            />
            <FormErrorMessage>
              {errors?.zip_code && errors.zip_code.message}
            </FormErrorMessage>
          </FormControl>

          {/* Number of Floors */}
          <FormControl isInvalid={!!errors?.floors} isRequired>
            <FormLabel htmlFor="floors">Number of Floors</FormLabel>
            <Input
              id="floors"
              type="number"
              placeholder="Number of Floors"
              {...register("floors", { required: "This is required" })}
            />
            <FormErrorMessage>
              {errors?.floors && errors.floors.message}
            </FormErrorMessage>
          </FormControl>

          {/* Price */}
          <FormControl isInvalid={!!errors?.price} isRequired>
            <FormLabel htmlFor="price">Price</FormLabel>
            <Input
              id="price"
              type="number"
              placeholder="Price"
              {...register("price", { required: "This is required" })}
            />
            <FormErrorMessage>
              {errors?.price && errors.price.message}
            </FormErrorMessage>
          </FormControl>

          {/* Bedrooms */}
          <FormControl isInvalid={!!errors?.number_of_bedrooms} isRequired>
            <FormLabel htmlFor="number_of_bedrooms">
              Number of Bedrooms
            </FormLabel>
            <Input
              id="number_of_bedrooms"
              type="number"
              placeholder="Number of Bedrooms"
              {...register("number_of_bedrooms", {
                required: "This is required",
              })}
            />
            <FormErrorMessage>
              {errors?.number_of_bedrooms && errors.number_of_bedrooms.message}
            </FormErrorMessage>
          </FormControl>

          {/* Bathrooms */}
          <FormControl isInvalid={!!errors?.number_of_bathrooms} isRequired>
            <FormLabel htmlFor="number_of_bathrooms">
              Number of Bathrooms
            </FormLabel>
            <Input
              id="number_of_bathrooms"
              type="number"
              placeholder="Number of Bathrooms"
              {...register("number_of_bathrooms", {
                required: "This is required",
              })}
            />
            <FormErrorMessage>
              {errors?.number_of_bathrooms &&
                errors.number_of_bathrooms.message}
            </FormErrorMessage>
          </FormControl>

          {/* Availability */}
          <FormControl>
            <FormLabel>Availability</FormLabel>
            <Switch
              isChecked={isAvailable}
              onChange={() => setAvailable(!isAvailable)}
            />
            <FormHelperText>
              {isAvailable ? "Available" : "Not Available"}
            </FormHelperText>
          </FormControl>

          {/* Has Parking */}
          <FormControl isInvalid={!!errors?.hasParking} isRequired>
            <FormLabel htmlFor="hasParking">Has Parking</FormLabel>
            <RadioGroup
              value={hasParking === true ? "true" : "false"} // Apply value based on propertyData
              onChange={() => sethasParking(!hasParking)}
              colorScheme="buttonColors"
            >
              <HStack spacing={4}>
                <Radio value="true">Yes</Radio>
                <Radio value="false">No</Radio>
              </HStack>
            </RadioGroup>

            <FormErrorMessage>
              {errors?.hasParking && errors.hasParking.message}
            </FormErrorMessage>
          </FormControl>

          {/* Has Balcony */}
          <FormControl isInvalid={!!errors?.hasBalcony} isRequired>
            <FormLabel htmlFor="hasBalcony">Has Balcony</FormLabel>
            <RadioGroup
              value={hasBalcony === true ? "true" : "false"} // Apply value based on propertyData
              onChange={() => sethasBalcony(!hasBalcony)}
              colorScheme="buttonColors"
            >
              <HStack spacing={4}>
                <Radio value="true">Yes</Radio>
                <Radio value="false">No</Radio>
              </HStack>
            </RadioGroup>
            <FormErrorMessage>
              {errors?.hasBalcony && errors.hasBalcony.message}
            </FormErrorMessage>
          </FormControl>

          {/* Pets Allowed */}
          <FormControl isInvalid={!!errors?.petsAllowed} isRequired>
            <FormLabel htmlFor="petsAllowed">Pets Allowed</FormLabel>
            <RadioGroup
              value={petsAllowed === true ? "true" : "false"} // Apply value based on propertyData
              onChange={() => setPetsAllowed(!petsAllowed)}
              colorScheme="buttonColors"
            >
              <HStack spacing={4}>
                <Radio value="true">Yes</Radio>
                <Radio value="false">No</Radio>
              </HStack>
            </RadioGroup>
            <FormErrorMessage>
              {errors?.petsAllowed && errors.petsAllowed.message}
            </FormErrorMessage>
          </FormControl>

          {/* Existing Images */}
          <FormControl>
            <FormLabel>Existing Images</FormLabel>
            <HStack spacing={2} mt={4}>
              {existingImages.map((image, index) => (
                <Box key={index} position="relative">
                  <Image
                    src={`http://localhost:4200${image}`}
                    width={"100px"}
                    height={"100px"}
                    alt={`Existing Image ${index + 1}`}
                  />
                  <Button
                    size="xs"
                    position="absolute"
                    top="0"
                    right="0"
                    colorScheme="red"
                    onClick={() => handleDeleteExistingImages(index)}
                  >
                    <FaTimes />
                  </Button>
                </Box>
              ))}
              {imagePreviews.map((preview, index) => (
                <Box key={index} position="relative">
                  <Image
                    src={preview}
                    width={"100px"}
                    height={"100px"}
                    alt={`Preview Image ${index + 1}`}
                  />
                  <Button
                    size="xs"
                    position="absolute"
                    top="0"
                    right="0"
                    colorScheme="red"
                    onClick={() => handleDeleteNewImages(index)}
                  >
                    <FaTimes />
                  </Button>
                </Box>
              ))}
            </HStack>
          </FormControl>

          {/* New Images */}
          <FormControl isInvalid={!!errors?.new_images}>
            <FormLabel htmlFor="new_images">Upload New Images</FormLabel>
            <Box position="relative" display="inline-block">
              <Input
                type="file"
                id="new_images"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              <Button
                as="label"
                htmlFor="new_images"
                width="auto"
                height="auto"
                px={4}
                py={2}
                mt={2}
                variant="solid"
              >
                Choose Files
              </Button>
            </Box>
          </FormControl>

          {/* Submit Button */}
          <Button mt={4} type="submit" width="full" isLoading={isPending}>
            Update Property
          </Button>
        </VStack>
      </form>
    </>
  );
};

export default UpdateProperties;
