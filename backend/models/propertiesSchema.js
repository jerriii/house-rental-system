const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  owner_id: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  name: { type: String},
  description: { type: String},
  property_type: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip_code: { type: Number, required: true },
  price: {
    type: Number,
    required: true,
  },
  number_of_bedrooms: {
    type: Number,
    required: true, // Set as required if you want to ensure that this field is always filled
  },
  number_of_bathrooms: {
    type: Number,
    required: true, // Set as required if you want to ensure that this field is always filled
  },
  floors: {
    type: Number,
    required: true, // Set as required if you want to ensure that this field is always filled
  },
  images: [{ type: String, required: true}], // Store image URLs as an array
  isAvailable: { type: Boolean, required: true, default: true },
  hasParking: { type: Boolean, required: true },
  hasBalcony: { type: Boolean, required: true },
  petsAllowed: { type: Boolean, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

// Model based on the schema
const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
