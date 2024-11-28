import { Property } from "./models.types";

export type HouseCardTypes = {
  _id: string;
  owner_id: string;
  property_type: string;
  description?: string;
  address: string;
  city: string;
  state: string;
  price: number;
  zip_code: number;
  floor: number;
  no_of_bedrooms: number;
  no_of_bathrooms: number;
  amenities?: string[];
  status: string;
  square_footage: number;
  images: string[];
  createdAt: Date;
  updated_at: Date;
};

export type PropertiesResponse = {
  properties: HouseCardTypes[];
  currentPage: number;
  totalPages: number;
  totalProperties: number;
}

export type HouseListingTypes<T> = {
  title: string;
  loading: boolean;
  data: Property[];
  navigation: string;
  state?: T;
};
