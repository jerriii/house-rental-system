import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTenantPreferences, getTenantPreferences, updateTenantPreferences } from "../../services/TenantPreferencesAPI";
import { useToast } from "@chakra-ui/react";
import { TenantPreferences } from "../../types";

export const useGetTenantPreferences = (tenantId: string) => {
  return useQuery({
    queryKey: ["tenantPreferences", tenantId],
    queryFn: () => getTenantPreferences(tenantId),
    enabled: !!tenantId, // Ensures the query only runs if tenantId is provided
  });
};

export const useTenantPreferences = () => {
  const toast = useToast();
  const queryClient = useQueryClient(); // Access the queryClient
return useMutation({
  mutationFn: createTenantPreferences,
  onSuccess: () => {
    // Display success toast notification
    toast({
      title: "Success!",
      description: "Tenant preferences created successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    })

    queryClient.invalidateQueries({queryKey:["tenantPreferences"]});
  },
  onError: (error) => {
    // Display error toast notification
    toast({
      title: "Error!",
      description: `Error creating tenant preferences.${error.message}`,
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top",
    })
  },
});
};


export const useUpdateTenantPreferences = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: ({
      tenantId,
      updatedPreferences,
    }: {
      tenantId: string;
      updatedPreferences: TenantPreferences;
    }) => updateTenantPreferences(tenantId, updatedPreferences),
    onSuccess: (data) => {

      toast({
        title: "Success!",
        description: "Tenant preferences updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({queryKey:["tenantPreferences", data.tenantId]});
    },
    onError: (error) => {
      toast({
        title: "Error!",
        description: "Error updating tenant preferences.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      
      console.error("Error updating tenant preferences:", error);
    },
  });
};
