import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Switch,
  Text,
  VStack,
} from "@chakra-ui/react";
import { TenantPreferences } from "../types";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserAuthStore from "../contexts/useUserAuthContext";
import { useGetTenantPreferences, useTenantPreferences } from "../hooks/react-query/TenantPreferences";
import Loader from "../components/common/Loader";

const PreferencesForm = () => {
  const { handleSubmit, register } = useForm<TenantPreferences>();
  const { user } = useUserAuthStore();
  const preferences_mutation = useTenantPreferences();
  const isLoading = preferences_mutation.isPending;
  const [hasVehicle, setHasVehicle] = useState(false);
  const [needsBalcony, setNeedsBalcony] = useState(false);
  const [petsAllowed, setPetsAllowed] = useState(false);
  const navigate = useNavigate();

  // Fetch tenant preferences
  const preferences = useGetTenantPreferences(user?._id ?? "");

  const onSubmit = (data: TenantPreferences) => {
    const allData = {
      ...data,
      hasVehicle,
      needsBalcony,
      petsAllowed,
      tenantId: user?._id ?? "",
    };

    preferences_mutation
      .mutateAsync(allData)
      .then(() => {
        navigate("/"); // Redirect to the home page after saving preferences
      })
      .catch((e) => {
        console.log(e);
      });

    console.log(allData);
  };
  // Show loader while fetching preferences
  if (preferences.isLoading) {
    return <Loader />;
  }

  // If no preferences are found, show the form
  return (
    <Box
      maxWidth="400px"
      mx="auto"
      mt="8"
      p="6"
      borderWidth="1px"
      borderRadius="md"
      shadow="md"
    >
      <Text fontSize="lg" fontWeight="bold" mb="4">
        Tenant Preferences
      </Text>
      <Text fontSize="md" fontWeight="bold" mb="4">
        No preferences found for this user. Please fill out your preferences.
      </Text>

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing="4">
          <FormControl>
            <FormLabel htmlFor="hasVehicle" mb="0">
              Do you have a vehicle?
            </FormLabel>
            <Switch
              id="hasVehicle"
              colorScheme="buttonColors"
              value={hasVehicle === true ? "yes" : "no"}
              onChange={(e) => setHasVehicle(e.target.checked)}
            />
            <FormHelperText>{hasVehicle ? "Yes" : "No"}</FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="needsBalcony" mb="0">
              Do you need a balcony?
            </FormLabel>
            <Switch
              id="needsBalcony"
              colorScheme="buttonColors"
              value={needsBalcony === true ? "yes" : "no"}
              onChange={(e) => setNeedsBalcony(e.target.checked)}
            />
            <FormHelperText>{needsBalcony ? "Yes" : "No"}</FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="petsAllowed" mb="0">
              Do you prefer pet-friendly properties?
            </FormLabel>
            <Switch
              id="petsAllowed"
              colorScheme="buttonColors"
              value={petsAllowed === true ? "yes" : "no"}
              onChange={(e) => setPetsAllowed(e.target.checked)}
            />
            <FormHelperText>{petsAllowed ? "Yes" : "No"}</FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel>Maximum Budget</FormLabel>
            <Input
              type="number"
              {...register("maxBudget")}
              placeholder="Enter your budget"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Preferred Locations</FormLabel>
            <Input
              {...register("preferredLocations")}
              placeholder="Enter locations separated by commas"
              autoComplete="off"
            />
          </FormControl>

          <Button type="submit" width="full" isLoading={isLoading}>
            Save Preferences
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default PreferencesForm;
