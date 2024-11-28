import { Booking } from "../types";

const baseUrl = "http://localhost:4200/api/bookings";
// const baseUrl = "https://7tvhfcbm-4200.inc1.devtunnels.ms/api/bookings";

// Create Booking (Tenant)
export const createBooking = async (bookingData: Booking) => {
  try {
    const response = await fetch(`${baseUrl}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });
    console.log(response);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error creating booking");
    }

    const savedBooking = await response.json();
    return savedBooking; // Return the saved booking data
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Error creating booking");
    } else {
      throw new Error("An unknown error occurred.");
    }
  }
};

// Get Bookings for Tenant
export const getBookingsForTenant = async (tenantId: string) => {
  try {
    const response = await fetch(`${baseUrl}/tenant/${tenantId}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error fetching bookings");
    }

    const data = await response.json();
    return data.bookings; // Return the list of bookings
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Error creating booking");
    } else {
      throw new Error("An unknown error occurred.");
    }
  }
};

// Get Bookings for Landlord
export const getBookingsForLandlord = async (landlordId: string) => {
  try {
    const response = await fetch(`${baseUrl}/landlord/${landlordId}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error fetching bookings");
    }

    const data = await response.json();
    return data.bookings; // Return the list of bookings
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Error creating booking");
    } else {
      throw new Error("An unknown error occurred.");
    }
  }
};

// Delete Booking (Tenant)
export const deleteBooking = async (bookingId: string) => {
  try {
    const response = await fetch(`${baseUrl}/${bookingId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error deleting booking");
    }

    const data = await response.json();
    return data.message; // Return success message
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Error creating booking");
    } else {
      throw new Error("An unknown error occurred.");
    }
  }
};

// Accept or Reject Booking (Landlord)
export const acceptRejectBooking = async (
  bookingId: string,
  status: string
) => {
  try {
    const response = await fetch(`${baseUrl}/status/${bookingId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error updating booking status");
    }

    const updatedBooking = await response.json();
    return updatedBooking; // Return updated booking data
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Error creating booking");
    } else {
      throw new Error("An unknown error occurred.");
    }
  }
};

export const getAllBookingsForAdmin = async () => {
  try {
    const response = await fetch(`${baseUrl}/admin`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // Handle errors if the response status is not in the range 200-299
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch bookings.");
    }

    // Parse the response JSON
    const data = await response.json();
    return data; // Return the fetched data
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    } else {
      console.error("Unknown error:", error);
    }
  }
};
