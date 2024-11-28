export type User = {
  _id?: string;
  name: string;
  image?: string;
  email: string;
  password?: string;
  phone: string;
  address?: string;
  role?: "landlord" | "tenant";
  is_profile_complete?: boolean;
  created_at?: Date;
  updated_at?: Date;
};

export type Property = {
  _id: string; // MongoDB ObjectId as string
  owner_id: string; // ObjectId of the user who owns the property (refers to the 'User' model)
  name?: string; // Optional property name
  description?: string; // Optional property description
  property_type: string; // Type of the property (e.g., house, apartment)
  address: string; // Property address
  city: string; // City where the property is located
  state: string; // State where the property is located
  zip_code: number; // Postal code (Zip code)
  price: number; // Property price (numeric)
  number_of_bedrooms: number; // Number of bedrooms
  number_of_bathrooms: number; // Number of bathrooms
  floors: number; // Number of floors in the property
  images: File[]; // Array of image URLs
  isAvailable: boolean;
  hasParking: boolean; // Whether the property has parking
  hasBalcony: boolean; // Whether the property has a balcony
  petsAllowed: boolean; // Whether pets are allowed
  created_at: Date; // Date when the property was created
  updated_at: Date;
};

export type Booking<TenantID = string, PropertyID = string> = {
  _id?: string;
  tenant_id: TenantID; // Tenant's user ID (default type is string)
  property_id: PropertyID; // Property ID (default type is string)
  booking_date?: string; // Date of the booking (ISO 8601 date string)
  move_in_date: string; // Date of move-in (ISO 8601 date string)
  move_out_date: string | null; // Date of move-out (ISO 8601 date string)
  total_rent: number;
  status?: string; // Total rent amount (number)
  field_visit?: boolean; // Whether a field visit was done (optional, boolean)
  created_at?: Date; // Date when the booking was created
  updated_at?: Date;
};

export type TenantPreferences = {
  tenantId: string; // Reference to the User model (using ObjectId)
  hasVehicle: boolean;
  needsBalcony: boolean;
  petsAllowed: boolean;
  maxBudget?: number; // Optional field, as it may be undefined initially
  preferredLocations: string[]; // Array of strings representing city names or locations
};
