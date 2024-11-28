import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import updateUserProfile, {
  deleteUserById,
  getUserById,
  getUsersForAdmin,
  loginUser,
  registerUser,
} from "../../services/UserDataService";
import useUserAuthStore from "../../contexts/useUserAuthContext";
import { useToast } from "@chakra-ui/react";
import { Inputs, User } from "../../types";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUserById,
    // Invalidate relevant queries on success to update UI
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] }); // Replace "users" with your specific query key
    },
    onError: (error) => {
      console.error("Error deleting user:", error.message);
    },
  });
};

export const useGetUserById = (userId: string) => {
  return useQuery({
    queryKey: ["user", userId], // Unique query key for caching
    queryFn: () => getUserById(userId),
    enabled: !!userId, // Prevent query from running without a valid ID
  });
};

export const useGetUsersForAdmin = () => {
  return useQuery({
    queryKey: ["adminUsers"],
    queryFn: getUsersForAdmin,
    staleTime: 1000 * 60 * 5, // Cache the data for 5 minutes
    retry: 3, // Retry failed requests up to 3 times
  });
};

export const useLoginMutation = () => {
  const { userLogin } = useUserAuthStore();
  const toast = useToast();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: async (data: {
      message: string;
      user: Inputs;
      redirectTo: string;
    }) => {
      userLogin(data.user); // Save user data to auth store
      toast({
        title: "Success!",
        description: data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
      toast({
        title: "Login Failed",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    },
  });
};

export const useRegisterMutation = () => {
  const toast = useToast();

  return useMutation({
      mutationFn: registerUser,
      onSuccess: () => {
          toast({
              title: "Registration Successful",
              description: "You have been registered successfully!",
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "top"
          });
      },
      onError: (error) => {
          toast({
              title: "Registration Failed",
              description: error?.message || "Something went wrong. Please try again.",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top"
          });
      },
  });
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: ({ id, updateData }:{ id: string; updateData: User }) => updateUserProfile(id, updateData),
    onSuccess: (data) => {
      // Invalidate queries related to the user to refresh data
      queryClient.invalidateQueries({queryKey:["user", data.id]});
      toast({
        title: "Success!",
        description: "User profile updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      })
    },
    onError: (error) => {
      console.error("Error updating user:", error.message);
      toast({
        title: "Error!",
        description: "Error updating user profile.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      })
    },
  });
}