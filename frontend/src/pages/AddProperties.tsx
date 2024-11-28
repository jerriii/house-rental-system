import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Image,
  Input,
  Radio,
  RadioGroup,
  Select,
  Switch,
  Textarea,
  Toast,
  VStack,
} from "@chakra-ui/react";
import { FieldError, FieldErrorsImpl, Merge, useForm } from "react-hook-form";
import { submitProperty } from "../services/PropertyDataAPI";
import { useMutation } from "@tanstack/react-query";
import useUserAuthStore from "../contexts/useUserAuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Property } from "../types";
import { FaChevronLeft, FaTimes } from "react-icons/fa";

const AddProperties = () => {
  const navigate = useNavigate();
  const { user } = useUserAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm<Property>();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]); // State for image previews
  const [newImages, setNewImages] = useState<File[]>([]);
  const [uploadStatus, setUploadStatus] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);

  const getErrorMessage = (
    error: FieldError | Merge<FieldError, FieldErrorsImpl<Property>> | undefined
  ) => (error ? String(error.message) : "");

  const addPropertiesMutation = useMutation({
    mutationFn: async (propertyData: Property) => {
      try {
        return await submitProperty(propertyData);
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error("An unknown error occurred.");
        }
      }
    },
    onSuccess: (data) => {
      console.log("Property added successfully:", data);
      reset();
      navigate("/landlord-properties");
      Toast({
        title: "Property added successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        float: "inline-start",
      });
    },
    onError: (error: Error) => {
      console.error("Error adding property:", error.message);
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFilesArray = Array.from(files);
      const updatedFiles = [...(getValues("images") || []), ...newFilesArray];
      setValue("images", updatedFiles);
      const newPreviewUrls = newFilesArray.map((file) =>
        URL.createObjectURL(file)
      );
      setNewImages((prev) => [...prev, ...files]);
      setImagePreviews((prev) => [...prev, ...newPreviewUrls]);
    }
  };

  const handleDeleteImages = (index: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const formSubmit = async (data: Property) => {
    imagePreviews.forEach((url) => URL.revokeObjectURL(url)); // Clean up preview URLs
    if (!data.images || data.images.length === 0) {
      setUploadStatus("Please select at least one image.");
      return;
    }
    await addPropertiesMutation.mutateAsync({
      ...data,
      owner_id: user?._id || "",
      images: newImages,
      isAvailable: isAvailable,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(formSubmit)}
      className="flex flex-col py-4"
      encType="multipart/form-data"
    >
      <Button variant={"link"} marginLeft={"auto"} as={Link} to="/properties">
        <FaChevronLeft /> Back
      </Button>
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
          <Input id="name" placeholder="Property Name" {...register("name")} />
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
          <FormLabel htmlFor="price">Price(per month)</FormLabel>
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
          <FormLabel htmlFor="number_of_bedrooms">Number of Bedrooms</FormLabel>
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
            {errors?.number_of_bathrooms && errors.number_of_bathrooms.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel>Availability</FormLabel>
          <Switch
            isChecked={isAvailable}
            onChange={() => setIsAvailable(!isAvailable)}
          />
          <FormHelperText>
            {isAvailable ? "Available" : "Not Available"}
          </FormHelperText>
        </FormControl>

        {/* Has Parking */}
        <FormControl isInvalid={!!errors?.hasParking} isRequired>
          <FormLabel htmlFor="hasParking">Has Parking</FormLabel>
          <RadioGroup
            onChange={(nextValue: string) =>
              setValue("hasParking", nextValue === "true")
            }
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
            onChange={(nextValue: string) =>
              setValue("hasBalcony", nextValue === "true")
            }
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
            onChange={(nextValue: string) =>
              setValue("petsAllowed", nextValue === "true")
            }
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

        {/* Images */}
        <FormControl isInvalid={!!errors?.images} isRequired>
          <FormLabel htmlFor="images">Images</FormLabel>
          <Box position="relative" display="inline-block">
            <Input
              type="file"
              id="images"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <Button
              as="label"
              htmlFor="images"
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
          <FormErrorMessage>
            {errors?.images && errors.images.message}
          </FormErrorMessage>

          {/* Image Previews */}
          <HStack spacing={2} mt={4}>
            {imagePreviews.map((src: string | undefined, index: number) => (
              <VStack key={index}>
                <Button
                  variant={"unstyled"}
                  p={0}
                  w={"fit-content"}
                  minWidth={"fit-content"}
                  h={"fit-content"}
                  onClick={() => handleDeleteImages(index)}
                  marginLeft={"auto"}
                >
                  <FaTimes />
                </Button>
                <Image
                  key={index}
                  src={src}
                  alt={`Preview ${index ?? 1}`}
                  boxSize="100px"
                  objectFit="cover"
                />
              </VStack>
            ))}
          </HStack>
        </FormControl>
        {uploadStatus && <p>{uploadStatus}</p>}

        {/* Submit Button */}
        <Button mt={4} type="submit" width="full">
          Submit Property
        </Button>
      </VStack>
    </form>
  );
};

export default AddProperties;
