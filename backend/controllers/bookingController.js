const Booking = require("../models/bookingSchema");
const Property = require("../models/propertiesSchema");
const User = require("../models/userSchema");


// 1. Create a Booking (Tenant)
const createBooking = async (req, res) => {
    try {
        const { tenant_id, property_id, move_in_date, move_out_date, total_rent, field_visit } = req.body;

        // Check if required fields are present
        if (!tenant_id || !property_id || !move_in_date || !total_rent) {
            return res.status(400).json({ error: "All required fields must be provided" });
        }

        //if user has booked any one house then he/she should not be able to book another house
        const user = await User.findById(tenant_id);
        if (user.role === 'tenant') {
            const bookingexisted = await Booking.findOne({tenant_id: user._id, status: {$ne: "Cancelled"}});
            if (bookingexisted) {
                return res.status(400).json({error: "You already have an active booking"});
            }
        }


        // Check if a booking already exists for the same tenant and property
        const existingBooking = await Booking.findOne({
            tenant_id,
            property_id,
            status: { $ne: "Cancelled" } // Exclude cancelled bookings
        });

        if (existingBooking) {
            return res.status(400).json({ error: "You already have an active booking for this property" });
        }

        // Create the new booking
        const newBooking = new Booking({
            tenant_id,
            property_id,
            move_in_date,
            move_out_date,
            total_rent,
            field_visit: field_visit || false,
        });

        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// 2. Get Bookings for Tenant
const getBookingsForTenant = async (req, res) => {
    try {
        const tenantId = req.params.id;
        const bookings = await Booking.find({ tenant_id: tenantId }).populate("property_id");
        res.status(200).json({bookings});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 3. Get Bookings for Landlord
const getBookingsForLandlord = async (req, res) => {
    try {
        const landlordId = req.params.landlordId;
        // Find properties owned by the landlord
        const properties = await Property.find({ owner_id: landlordId });

        // Get bookings for those properties
        const propertyIds = properties.map((property) => property._id);
        const bookings = await Booking.find({ property_id: { $in: propertyIds } })
            .populate("tenant_id")
            .populate("property_id");

        res.status(200).json({bookings});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 4. Delete Booking (Tenant)
const deleteBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;

        const deletedBooking = await Booking.findByIdAndDelete(bookingId);

        if (!deletedBooking) {
            return res.status(404).json({ error: "Booking not found" });
        }

        res.status(200).json({ message: "Booking deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 6. Accept or Reject Booking (Landlord)
const acceptRejectBooking = async (req, res) => {
    try {
        const bookingId = req.params.bookingId;
        const { status } = req.body; // "Confirmed" or "Cancelled"

        // Ensure the status is either "Confirmed" or "Cancelled"
        if (!["Confirmed", "Cancelled"].includes(status)) {
            return res.status(400).json({ error: "Invalid status. It should be either 'Confirmed' or 'Cancelled'" });
        }

        // Find the booking and update the status
        const updatedBooking = await Booking.findByIdAndUpdate(
            bookingId,
            { status, updated_at: Date.now() },
            { new: true }
        );

        if (!updatedBooking) {
            return res.status(404).json({ error: "Booking not found" });
        }

        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllBookingsForAdmin = async (req, res) => {
    try {
        const allBookings = await Booking.find().populate("tenant_id").populate("property_id");
        res.status(200).json(allBookings);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};





module.exports = {createBooking, getBookingsForTenant, getBookingsForLandlord, deleteBooking, acceptRejectBooking, getAllBookingsForAdmin};