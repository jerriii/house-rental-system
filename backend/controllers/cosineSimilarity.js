const mongoose = require("mongoose");
const Property = require("../models/propertiesSchema");
const TenantPreferences = require("../models/tenantPreferencesSchema");

// Cosine Similarity Calculation
function cosineSimilarity(A, B) {
    const dotProduct = A.reduce((sum, value, index) => sum + value * B[index], 0);
    const magnitudeA = Math.sqrt(A.reduce((sum, value) => sum + value * value, 0));
    const magnitudeB = Math.sqrt(B.reduce((sum, value) => sum + value * value, 0));

    return dotProduct / (magnitudeA * magnitudeB);
}

// Convert Tenant Preferences to Vector
function tenantToVector(preferences, property) {
    return [
        preferences.hasVehicle === property.hasParking ? 1 : 0, // Matching parking
        preferences.needsBalcony === property.hasBalcony ? 1 : 0, // Matching balcony
        preferences.petsAllowed === property.petsAllowed ? 1 : 0, // Matching pets allowed
        preferences.maxBudget && preferences.maxBudget >= property.price ? 1 : 0, // Budget
        preferences.preferredLocations.includes(property.address) ? 1 : 0, // Location match
        property.price, // Price of the property
        property.number_of_bedrooms, // Bedrooms
        property.number_of_bathrooms, // Bathrooms
        property.floors // Number of floors
    ];
}

// Fetch Tenant Preferences and Property Details
async function recommendPropertiesForTenant(tenantId) {
    // Fetch Tenant Preferences
    const tenantPreferences = await TenantPreferences.findOne({ tenantId });

    // Fetch Properties
    const properties = await Property.find();

    // Create an array to store similarity scores
    const recommendations = [];

    // Compare each property to the tenant's preferences
    properties.forEach((property) => {
        // Convert tenant preferences and property into vectors
        const tenantVector = tenantToVector(tenantPreferences, property);
        const propertyVector = tenantToVector(tenantPreferences, property);

        // Calculate cosine similarity between the vectors
        const similarityScore = cosineSimilarity(tenantVector, propertyVector);

        // Push property and similarity score to recommendations
        recommendations.push({
            property,
            similarityScore
        });
    });

    // Sort properties by similarity score in descending order
    recommendations.sort((a, b) => b.similarityScore - a.similarityScore);

    return recommendations;
}

module.exports = { recommendPropertiesForTenant };
