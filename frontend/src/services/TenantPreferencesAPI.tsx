import { TenantPreferences } from "../types";

const baseUrl = "http://localhost:4200/api/tenant-preferences";
// const baseUrl = "https://7tvhfcbm-4200.inc1.devtunnels.ms/api/tenant-preferences";

// Create tenant preferences
export const createTenantPreferences = async (
  preferences: TenantPreferences
) => {
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        preferences // spreading preferences for other fields
      ),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Tenant preferences created successfully:", data);
    } else {
      console.error("Error creating tenant preferences:", data.message);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

// Get tenant preferences by tenantId
export const getTenantPreferences = async (tenantId: string) => {
  try {
    const response = await fetch(`${baseUrl}/${tenantId}`, {
      method: "GET",
    });

    const data = await response.json();


    if (response.ok) {
      console.log("Tenant preferences fetched successfully:", data);
      return data;
    } else {
      console.error("Error fetching tenant preferences:", data.message);
      return;
    }
  } catch (error) {
    console.error("Error:", error);
    return {};
  }
};

export const updateTenantPreferences = async (
  tenantId: string,
  updatedPreferences: TenantPreferences
) => {
  try {
    const response = await fetch(`${baseUrl}/${tenantId}`, {
      method: "PATCH", // Use PATCH for updating
      headers: {
        "Content-Type": "application/json",
        // Add other headers if required, like authorization tokens
      },
      body: JSON.stringify(updatedPreferences), // Convert the updated preferences to JSON
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`Failed to update preferences: ${response.statusText}`);
    }

    const data = await response.json();
    return data; // Return the data (success message and updated preferences)
  } catch (error) {
    console.error("Error updating tenant preferences:", error);
    throw error; // Throw the error to be handled by the calling function
  }
};
