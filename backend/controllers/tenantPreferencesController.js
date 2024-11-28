const TenantPreferences = require("../models/tenantPreferencesSchema");

// Create tenant preferences function
const createTenantPreferences = async (req, res) => {
    const {
        tenantId,
        hasVehicle,
        needsBalcony,
        petsAllowed,
        maxBudget,
        preferredLocations,
    } = req.body;

    try {
        // Check if the tenant already has preferences
        const existingPreferences = await TenantPreferences.findOne({ tenantId });
        if (existingPreferences) {
            return res.status(400).json({ message: "Tenant preferences already exist." });
        }

        // Create new preferences
        const newPreferences = new TenantPreferences({
            tenantId,
            hasVehicle,
            needsBalcony,
            petsAllowed,
            maxBudget,
            preferredLocations,
        });

        // Save the new preferences to the database
        const savedPreferences = await newPreferences.save();
        res.status(201).json({ message: "Tenant preferences created successfully", preferences: savedPreferences });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get tenant preferences function by tenant ID
const getTenantPreferences = async (req, res) => {
    const { tenantId } = req.params;

    try {
        // Find the tenant preferences by tenantId
        const preferences = await TenantPreferences.findOne({ tenantId });
        if (!preferences) {
            return res.status(404).json({ message: "Tenant preferences not found." });
        }
        res.status(200).json(preferences);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update tenant preferences function by tenant ID
const updateTenantPreferences = async (req, res) => {
    const { tenantId } = req.params;
    const {
        hasVehicle,
        needsBalcony,
        petsAllowed,
        maxBudget,
        preferredLocations,
    } = req.body;

    try {
        // Find the tenant preferences by tenantId
        const preferences = await TenantPreferences.findOne({ tenantId });
        if (!preferences) {
            return res.status(404).json({ message: "Tenant preferences not found." });
        }

        // Update the preferences fields with only the provided data
        if (hasVehicle !== undefined) preferences.hasVehicle = hasVehicle;
        if (needsBalcony !== undefined) preferences.needsBalcony = needsBalcony;
        if (petsAllowed !== undefined) preferences.petsAllowed = petsAllowed;
        if (maxBudget !== undefined) preferences.maxBudget = maxBudget;
        if (preferredLocations) preferences.preferredLocations = preferredLocations;

        // Save the updated preferences
        const updatedPreferences = await preferences.save();
        res.status(200).json({ message: "Tenant preferences updated successfully", preferences: updatedPreferences });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};


module.exports = { createTenantPreferences, getTenantPreferences, updateTenantPreferences };
