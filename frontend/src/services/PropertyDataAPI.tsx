import { UpdateFormFields } from "../pages/UpdateProperties";
import { Property } from "../types";

const baseUrl = "http://localhost:4200/api/properties/";
// const baseUrl = "https://7tvhfcbm-4200.inc1.devtunnels.ms/api/properties/";

// Fetch all properties
export const fetchProperties = async () => {
  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch properties");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw new Error("Error fetching properties.");
  }
};

// Submit a new property
export const submitProperty = async (propertyData: Property) => {
  const formData = new FormData();

  // Append all non-file fields
  Object.entries(propertyData).forEach(([key, value]) => {
    if (key !== "images" && value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  // Append 'images' field as File[]
  if (propertyData.images?.length) {
    propertyData.images.forEach((image: File) => {
      formData.append("images", image);
    });
  }

  try {
    const response = await fetch(`${baseUrl}add`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("API Error:", error);
      throw new Error(error.message);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error submitting property data: " + error.message);
    }
    throw new Error(
      "An unknown error occurred while submitting property data."
    );
  }
};

// Fetch property by owner ID
export const getPropertiesByOwnerId = async (ownerId: string) => {
  try {
    const response = await fetch(`${baseUrl}owner/${ownerId}`);
    // if (!response.ok) {
    //   throw new Error('Property not found or other error');
    // }
    return await response.json();
  } catch (error) {
    console.error("Error fetching property:", error);
    throw new Error("Error fetching property by owner ID.");
  }
};

// Fetch property by ID
export const getPropertyById = async (propertyId: string) => {
  try {
    const response = await fetch(`${baseUrl}${propertyId}`);
    if (!response.ok) {
      throw new Error("Property not found or other error");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching property:", error);
    throw new Error("Error fetching property by ID.");
  }
};

// Update property by ID
export const updatePropertyById = async (
  propertyId: string,
  propertyData: UpdateFormFields
) => {
  try {
    const formData = new FormData();

    // Append existing images and new images
    propertyData.existing_images.forEach((imageUrl) => {
      formData.append("existing_images", imageUrl);
    });

    propertyData.new_images.forEach((file) => {
      formData.append("new_images", file);
    });

    // Append other form fields
    Object.entries(propertyData).forEach(([key, value]) => {
      if (
        key !== "existing_images" &&
        key !== "new_images" &&
        value !== null &&
        value !== undefined
      ) {
        if (typeof value === "boolean") {
          // Handle boolean explicitly
          formData.append(key, value ? "true" : "false");
        } else {
          formData.append(key, String(value));
        }
      }
    });

    const response = await fetch(`${baseUrl}${propertyId}`, {
      method: "PATCH",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to update property");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating property:", error);
    throw new Error("Error updating property.");
  }
};

// Delete property by ID
export const deleteProperty = async (propertyId: string) => {
  try {
    const response = await fetch(`${baseUrl}${propertyId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete property");
    }

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error deleting property:", error);
      return { success: false, error: error.message };
    }
    return {
      success: false,
      error: "Unknown error occurred while deleting property",
    };
  }
};

export async function fetchRecommendedProperties(id:string) {
  try {
    const response = await fetch(`${baseUrl}recommend/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', 
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch recommended properties');
    }

    const data = await response.json(); // Parse the JSON response
    return data; // Return the fetched data
  } catch (error) {
    console.error('Error fetching recommended properties:', error);
    throw error; // Rethrow the error for handling elsewhere
  }
}
