const path = require("node:path");
const Property = require("../models/propertiesSchema");
const Booking = require("../models/bookingSchema");

const fs = require("node:fs");

const getProperties = async (req, res) => {
  try {
    const { isAvailable } = req.query;

    // Fetch properties with optional filtering by isAvailable
    const query = {};
    if (isAvailable !== undefined) {
      query.isAvailable = isAvailable === "true"; // Convert the query string to boolean
    }

    const properties = await Property.find(query);
    const limited_properties = properties.slice(0, 3);

    // Return response with filtered properties
    res.status(200).json({
      properties,
      limited_properties
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: "Internal server error" }); // Provide a generic error message
  }
};

const getPropertiesByOwnerId = async (req, res) => {
  const owner_id = req.params.id;
  try {
    // Find properties by owner_id
    const property = await Property.find({ owner_id });

    if (!property || property.length === 0) {
      return res.status(404).json({ error: "You have no properties." });
    }
    res.status(200).json(property);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: "Internal server error" }); // Provide a generic error message
  }
};

const addProperties = async (req, res) => {
  // Check if no files were uploaded
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded' });
  }

  try {
    const {
      owner_id,
      property_type,
      name,
      description,
      address,
      city,
      state,
      zip_code,
      number_of_bedrooms,
      number_of_bathrooms,
      floors,
      price,
      hasParking,
      hasBalcony,
      petsAllowed,
      isAvailable // Include the new field
    } = req.body;

    // Ensure that all required fields are present
    if (
        !owner_id ||
        !property_type ||
        !address ||
        !city ||
        !state ||
        !zip_code ||
        !number_of_bedrooms ||
        !number_of_bathrooms ||
        !floors ||
        !price ||
        hasParking === undefined ||
        hasBalcony === undefined ||
        petsAllowed === undefined ||
        isAvailable === undefined // Check if isAvailable is provided
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Extract the file paths for each uploaded image
    const imagePaths = req.files.map(file => `/uploads/${file.filename}`);

    // Create a new property object and assign the image paths to the images field
    const newProperty = new Property({
      owner_id,
      property_type,
      name,
      description,
      address,
      city,
      state,
      zip_code,
      number_of_bedrooms,
      number_of_bathrooms,
      floors,
      price,
      hasParking,
      hasBalcony,
      petsAllowed,
      isAvailable,  // Assign the isAvailable value
      images: imagePaths,  // Store the array of image paths
    });

    // Save the new property to the database
    await newProperty.save();

    // Respond with the newly created property
    res.status(201).json(newProperty);
  } catch (err) {
    console.error("Error:", err);  // Log the full error
    res.status(500).json({ error: err.message });  // Respond with detailed error
  }
};

const getPropertyById = async (req, res) => {
  const propertyId = req.params.id;
  try {
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }
    res.status(200).json(property);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: "Internal server error" }); // Provide a generic error message
  }
};

const updateProperty = async (req, res) => {
  const propertyId = req.params.id;

  // Check if propertyId is provided
  if (!propertyId) {
    return res.status(400).json({ error: "Property ID is missing" });
  }

  try {
    // Fetch the existing property from the database
    const existingProperty = await Property.findById(propertyId);

    if (!existingProperty) {
      return res.status(404).json({ error: "Property not found" });
    }

    // Incoming data is structured in the following way:
    const { existing_images = [], number_of_bedrooms, number_of_bathrooms, price, hasParking, hasBalcony, petsAllowed, isAvailable, description } = req.body;

    // Ensure existing_images is defined and is an array
    const existingImages = existingProperty.images || []; // Images already associated with the property

    // New image files handling (from multer)
    const newImageFiles = req.files || []; // New images uploaded via `multer`

    // Remove images that are not in the updated list
    const imagesToRemove = existingImages.filter(img => !existing_images.includes(img));

    // Delete images from the file system
    imagesToRemove.forEach(imagePath => {
      const fullPath = path.join(__dirname, '..', 'uploads', imagePath.replace('/uploads/', ''));
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath); // Remove from the file system
      }
    });

    // Map new image files to paths and add them to the list of images
    const newImagePaths = newImageFiles.map(file => `/uploads/${file.filename}`);

    // Combine existing images with new ones
    const updatedImages = [...existing_images, ...newImagePaths];

    // Prepare the updated property data
    const updatedData = {
      property_type: req.body.property_type || existingProperty.property_type,
      name: req.body.name || existingProperty.name,
      description: description || existingProperty.description,
      address: req.body.address || existingProperty.address,
      city: req.body.city || existingProperty.city,
      state: req.body.state || existingProperty.state,
      zip_code: req.body.zip_code || existingProperty.zip_code,
      number_of_bedrooms: number_of_bedrooms || existingProperty.number_of_bedrooms,
      number_of_bathrooms: number_of_bathrooms || existingProperty.number_of_bathrooms,
      floors: req.body.floors || existingProperty.floors,
      price: price || existingProperty.price,
      hasParking: req.body.hasParking !== undefined ? JSON.parse(req.body.hasParking) : existingProperty.hasParking,
      hasBalcony: req.body.hasBalcony !== undefined ? JSON.parse(req.body.hasBalcony) : existingProperty.hasBalcony,
      petsAllowed: req.body.petsAllowed !== undefined ? JSON.parse(req.body.petsAllowed) : existingProperty.petsAllowed,
      isAvailable: req.body.isAvailable !== undefined ? JSON.parse(req.body.isAvailable) : existingProperty.isAvailable, // Update isAvailable if provided
      images: updatedImages,
    };

    // Update the property in the database
    const updatedProperty = await Property.findByIdAndUpdate(propertyId, updatedData, { new: true, runValidators: true });

    // Return the updated property data in the response
    res.status(200).json(updatedProperty);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};



const deleteProperty = async (req, res) => {
  const propertyId = req.params.id;

  try {
    // Find property by ID
    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    // Check for and delete all bookings associated with this property
    const bookings = await Booking.find({ property_id: propertyId });
    if (bookings.length > 0) {
      await Booking.deleteMany({ property_id: propertyId });
    }

    // Optionally, delete the images from the file system
    property.images.forEach((image) => {
      const imagePath = path.join(__dirname, "..", "uploads", image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    });

    // Delete the property from the database
    await property.deleteOne();

    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting property" });
  }
};






module.exports = { getProperties, addProperties, getPropertiesByOwnerId, getPropertyById, updateProperty, deleteProperty};
