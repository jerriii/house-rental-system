const mongoose = require("mongoose");

// Define the Booking schema
const bookingSchema = new mongoose.Schema({
    tenant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the tenant
        required: true,
    },
    property_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property", // Reference to the property
        required: true,
    },
    booking_date: {
        type: Date,
        default: Date.now, // Date when the booking is made
    },
    move_in_date: {
        type: Date, // Tenant's move-in date
        required: true,
    },
    move_out_date: {
        type: Date, // Tenant's move-out date (if applicable)
    },
    field_visit: {
        type: Boolean,
        default: false,
    },
    total_rent: {
        type: Number, // Calculated rent for the booking period
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Confirmed", "Cancelled"], // Status of the booking
        default: "Pending",
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
});

// Create the Booking model
const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
