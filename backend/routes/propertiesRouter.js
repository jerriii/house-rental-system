const express = require("express");

const matchController = require("../controllers/matchController");
const { getProperties, addProperties, getPropertiesByOwnerId, getPropertyById, updateProperty, deleteProperty,
    recommendProperty
} = require("../controllers/PropertiesController");
const router = express.Router();
const path = require('node:path');
const {upload} = require("../middleware/Image");


// Serve static files from /uploads folder
router.get("/", getProperties);
router.get("/owner/:id", getPropertiesByOwnerId);
router.use('/uploads', express.static(path.join(__dirname, 'uploads')));
router.post("/add", upload.array("images"), addProperties);
router.get("/:id", getPropertyById);
router.patch("/:id", upload.array("new_images"), updateProperty);
router.delete("/:id", deleteProperty);
router.get('/recommend/:id', matchController.recommendProperties);

module.exports = router;
