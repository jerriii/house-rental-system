const mongoose = require("mongoose");
const tenantPreferencesSchema = new mongoose.Schema({
    tenantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    hasVehicle: {
        type: Boolean,
        default: false,
    },
    needsBalcony: {
        type: Boolean,
        default: false,
    },
    petsAllowed: {
        type: Boolean,
        default: false,
    },
    maxBudget: {
        type: Number,
    },
    preferredLocations: {
        type: [String], // Array of preferred locations (e.g., city names)
    },
});

const TenantPreferences = mongoose.model("TenantPreferences", tenantPreferencesSchema);
module.exports = TenantPreferences;
