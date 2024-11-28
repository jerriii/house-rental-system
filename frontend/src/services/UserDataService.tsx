import { User } from "../types";

// const url = "https://7tvhfcbm-4200.inc1.devtunnels.ms/api/users/";
const url = "http://localhost:4200/api/users/";

// Login an existing user
export const loginUser = async (userData: { email: string; password: string }) => {
  const response = await fetch(`${url}login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (response.ok) {
    const data = await response.json();
    return data; // This will typically contain the token and any user info
  } else {
    const error = await response.json();
    throw new Error(error.message);
  }
};

// Create a new user
export const registerUser = async (userData: object) => {
  const response = await fetch(`${url}register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (response.ok) {
    return await response.json();
  } else {
    const error = await response.json();
    throw new Error(error.message);
  }
};


export const getUserById = async (userId:string) => {
  try {
    const response = await fetch(`${url}/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("User not found");
      } else {
        throw new Error("Failed to fetch user details");
      }
    }

    const data = await response.json();
    return data; // Return the user data if needed
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    } else {
      console.error("Unknown error:", error);
    }
    throw error; // Propagate the error if required
  }
};

export const getUsersForAdmin = async () => {
  try {
    const response = await fetch(`${url}admin/getUsers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // Handle errors if the response status is not in the range 200-299
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch users.");
    }

    // Parse the response JSON
    const data = await response.json();
    return data; // Return the fetched data
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
      throw error; // Re-throw error to handle it where this function is called
    } else {
      console.error("Unknown error:", error);
    }
  }
};

const updateUserProfile = async (id:string, updateData:User) => {
  const response = await fetch(`${url}/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update user profile");
  }

  return await response.json(); // Assuming backend sends updated user data
};

export const deleteUserById = async (id:string) => {
  try {
    const response = await fetch(`${url}/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete the user.");
    }

    const result = await response.json();
    console.log("User deleted successfully:", result.message);
    return result; // Returns the response data
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error deleting user:", error.message);
      throw error; // Re-throws the error for further handling
    }
    console.error("Unknown error deleting user:", error);
  }
};


export default updateUserProfile;

