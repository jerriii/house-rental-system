import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteProperty,
  fetchProperties,
  fetchRecommendedProperties,
  getPropertiesByOwnerId,
  getPropertyById,
  updatePropertyById,
} from "../../services/PropertyDataAPI";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { UpdateFormFields } from "../../pages/UpdateProperties";

// Custom hook for fetching properties
export const useFetchProperties = () => {
  return useQuery({
    queryKey: ["properties"], // Unique query key for this data
    queryFn: fetchProperties, // The fetch function
    refetchInterval: 10000, // for polling
    retry: 1, // Number of retries on failure
  });
};

export function useRecommendedProperties(id: string) {
  return useQuery({
    queryKey: ["recommendedProperties", id],
    queryFn: () => fetchRecommendedProperties(id),
    enabled: !!id, // Ensures the query is not run until a valid `id` is provided
    retry: 3, // Optional: retry fetching if the request fails
    refetchOnWindowFocus: false, // Optional: Disable refetching on window focus
  });
}

export const usePropertiesByOwnerId = (ownerId: string) => {
  return useQuery({
    queryKey: ["properties", ownerId],
    queryFn: () => getPropertiesByOwnerId(ownerId),
    enabled: !!ownerId,
  });
};

export const useDeleteProperty = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: deleteProperty,
    onSuccess: () => {
      // Optionally trigger a query invalidation or other logic
      queryClient.invalidateQueries({ queryKey: ["property"] });
      // Show success toast
      toast({
        title: "Property deleted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // Navigate to landlord properties page
      navigate("/landlord-properties");
    },
    onError: (error: unknown) => {
      // Show error toast
      toast({
        title: "Failed to delete property",
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });
};

export const useDeletePropertyForAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProperty,
    onSuccess: () => {
      // Optionally trigger a query invalidation or other logic
      queryClient.invalidateQueries({ queryKey: ["property"] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        console.log(error.message);
      }
      console.log(error);
    },
  });
};

export const useGetPropertyById = (propertyId: string) => {
  return useQuery({
    queryKey: ["property", propertyId],
    queryFn: () => getPropertyById(propertyId),
    enabled: !!propertyId,
  });
};

export const useUpdateProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      propertyId,
      propertyData,
    }: {
      propertyId: string;
      propertyData: UpdateFormFields;
    }) => {
      // Call the API function to update the property
      return await updatePropertyById(propertyId, propertyData);
    },
    onSuccess: () => {
      // Invalidate relevant queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["property"] }); // Replace 'properties' with your query key
    },
  });
};
