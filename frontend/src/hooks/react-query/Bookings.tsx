import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  acceptRejectBooking,
  createBooking,
  deleteBooking,
  getAllBookingsForAdmin,
  getBookingsForLandlord,
  getBookingsForTenant,
} from "../../services/BookingAPI";
import { useToast } from "@chakra-ui/react";
import { Booking } from "../../types";

export const useAcceptRejectBooking = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: (params: { bookingId: string; status: string }) =>
      acceptRejectBooking(params.bookingId, params.status),
    onError: (error) => {
      toast({
        title: "Error updating booking status",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["tenantBookings", data.bookingId],
      });
      toast({
        title: "Success!",
        description: data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    },
  });
};

export const useCreateBooking = () => {
  const toast = useToast();
  return useMutation({
    mutationFn: (bookingData: Booking) => createBooking(bookingData),
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Booking created successfully.",
        status: "success",
        duration: 3000, // Duration in milliseconds (5 seconds)
        isClosable: true, // Allow users to dismiss the toast
        position: "top", // Position of the toast
      });
    },

    //toast notification type is info

    onError: (error) => {
      toast({
        title: "",
        description: `${error.message}`,
        status: "info",
        duration: 5000, // Duration in milliseconds (5 seconds)
        isClosable: true, // Allow users to dismiss the toast
        position: "top", // Position of the toast
      });
    },
  });
};

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: (bookingId: string) => deleteBooking(bookingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tenantBookings"] });
      toast({
        title: "Booking deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    },
    onError: (error) => {
      toast({
        title: "Error deleting booking",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      console.error("Error deleting booking:", error);
    },
  });
};

export const useGetAllBookingsForAdmin = () => {
  return useQuery({
    queryKey: ["allBookingsForAdmin"], // Unique key for caching
    queryFn: getAllBookingsForAdmin, // The API function to fetch data
    staleTime: 5 * 60 * 1000, // Data remains fresh for 5 minutes
    retry: 3, // Retry fetching data up to 3 times on failure
  });
};

export const useBookingsForLandlord = (landlordId: string) => {
  return useQuery({
    queryKey: ["landlordBookings", landlordId], // Query key to uniquely identify the data
    queryFn: () => getBookingsForLandlord(landlordId),
  });
};

export const useGetBookingsForTenant = (tenantId: string) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["tenantBookings", tenantId], // Query key to uniquely identify the data
    queryFn: () => getBookingsForTenant(tenantId),
  });

  return { data, error, isLoading };
};
