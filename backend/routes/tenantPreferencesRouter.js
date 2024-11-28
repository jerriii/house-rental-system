const express = require("express");
const router = express.Router();
const {
    createTenantPreferences,
    getTenantPreferences,
    updateTenantPreferences,
} = require("../controllers/tenantPreferencesController");

// Create tenant preferences
router.post("/", createTenantPreferences);

// Get tenant preferences by tenant ID
router.get("/:tenantId", getTenantPreferences);

// Update tenant preferences by tenant ID
router.patch("/:tenantId", updateTenantPreferences);

module.exports = router;
