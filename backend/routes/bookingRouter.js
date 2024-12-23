const express = require("express");
const router = express.Router();
const { createBooking, getBookingsForTenant, getBookingsForLandlord, updateBooking, deleteBooking, acceptRejectBooking,
    getAllBookingsForAdmin
} = require("../controllers/bookingController");

// Route for tenants to create a booking
router.post("/create", createBooking);

// Route for tenants to view their bookings
router.get("/tenant/:id", getBookingsForTenant);

// Route for landlords to view bookings for their properties
router.get("/landlord/:landlordId", getBookingsForLandlord);

router.get("/admin", getAllBookingsForAdmin);

// Route for tenants to delete a booking
router.delete("/:id", deleteBooking);

// Route for landlord to accept or reject a booking using PATCH (partial update)
router.patch("/status/:bookingId", acceptRejectBooking);



module.exports = router;