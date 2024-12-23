const mongoose = require('mongoose');
const TenantPreferences = require("../models/tenantPreferencesSchema"); // Import Tenant Preferences model
const Property = require("../models/propertiesSchema"); // Import Property model

// Define Weights for Features
const weights = {
    hasVehicle: 0.15,        // Weight for vehicle (parking) preference
    needsBalcony: 0.10,      // Weight for balcony preference
    petsAllowed: 0.20,       // Weight for pets allowed preference
    maxBudget: 0.30,         // Weight for budget preference
    preferredLocation: 0.25, // Weight for location preference
};

// Cosine Similarity Calculation
function cosineSimilarity(A, B) {
    const dotProduct = A.reduce((sum, value, index) => sum + value * B[index], 0);
    const magnitudeA = Math.sqrt(A.reduce((sum, value) => sum + value * value, 0));
    const magnitudeB = Math.sqrt(B.reduce((sum, value) => sum + value * value, 0));

    return dotProduct / (magnitudeA * magnitudeB);
}

// Normalize feature values (example: price)
function normalizeFeatureValue(value, min, max) {
    return (value - min) / (max - min); // Min-Max normalization
}

// Convert Tenant Preferences to Weighted Vector
function tenantToVector(preferences, property, weights) {
    return [
        (preferences.hasVehicle === property.hasParking ? 1 : 0) * weights.hasVehicle,        // Matching parking with weight
        (preferences.needsBalcony === property.hasBalcony ? 1 : 0) * weights.needsBalcony,    // Matching balcony with weight
        (preferences.petsAllowed === property.allowsPets ? 1 : 0) * weights.petsAllowed,      // Matching pets allowed with weight
        (preferences.maxBudget && preferences.maxBudget >= property.price ? 1 : 0) * weights.maxBudget,  // Matching budget with weight
        (preferences.preferredLocations.includes(property.address) ? 1 : 0) * weights.preferredLocation, // Matching location with weight
        normalizeFeatureValue(property.price, 0, 10000) * weights.maxBudget, // Normalize and weight the price
    ];
}

// Function to match tenant preferences with properties and return ranked recommendations
const recommendProperties = async (req, res) => {
    const tenantId = req.params.id; // Get tenantId from the request parameters

    // Convert tenantId to ObjectId
    const tenantObjectId = new mongoose.Types.ObjectId(tenantId);

    try {
        // Fetch the tenant's preferences
        const tenantPreferences = await TenantPreferences.findOne({ tenantId: tenantObjectId }).exec();

        if (!tenantPreferences) {
            return res.status(404).json({ error: "Tenant preferences not found." });
        }

        // Ensure preferredLocations is an array, if it's a string, split it into an array
        let preferredLocationsArray = [];
        if (Array.isArray(tenantPreferences.preferredLocations)) {
            preferredLocationsArray = tenantPreferences.preferredLocations; // Already an array
        } else if (typeof tenantPreferences.preferredLocations === 'string') {
            preferredLocationsArray = tenantPreferences.preferredLocations.split(',').map(location => location.trim()); // Convert string to array
        } else {
            return res.status(400).json({ error: "Invalid preferredLocations format." });
        }

        // Fetch properties based on price within tenant's budget
        const properties = await Property.find({
            price: { $lte: tenantPreferences.maxBudget }, // Price within tenant's budget
        }).exec();

        // Define a similarity threshold (adjust based on your preference)
        const similarityThreshold = 0.7; // Properties with a similarity score >= this will be included

        // Calculate cosine similarity for each property
        const recommendations = properties.map(property => {
            // Convert tenant preferences and property into vectors with weights
            const tenantVector = tenantToVector(tenantPreferences, property, weights);
            const propertyVector = tenantToVector(tenantPreferences, property, weights);

            // Calculate cosine similarity between the vectors
            const similarityScore = cosineSimilarity(tenantVector, propertyVector);

            // Include property only if similarity score is greater than or equal to the threshold
            if (similarityScore >= similarityThreshold) {
                // Attach similarity score to the property for sorting later
                return { ...property.toObject(), similarityScore }; // Store similarity score
            }
            return null; // Exclude properties with low similarity score
        }).filter(property => property !== null); // Remove null values

        // Sort properties by similarity score in descending order
        recommendations.sort((a, b) => b.similarityScore - a.similarityScore);

        // Return the properties sorted by similarity score
        return res.status(200).json({ recommendedProperties: recommendations });
    } catch (err) {
        console.error("Error recommending properties:", err);
        return res.status(500).json({ error: "An error occurred while fetching recommendations." });
    }
};

module.exports = { recommendProperties };
