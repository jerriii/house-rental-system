const bcrypt = require("bcrypt");
const User = require("../models/userSchema");
const TenantPreferences = require("../models/tenantPreferencesSchema");
const Booking = require("../models/bookingSchema");
const Property = require("../models/propertiesSchema");
const updateUserProfile = require("./updateprofile");

// Login function
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "The password is incorrect" });
    }
    if (user.role === 'tenant') {
      const preferences = await TenantPreferences.findOne({ tenantId: user._id });
      if (!preferences) {
        // If no preferences, send response with redirect to /preferences
        return res.status(200).json({
          user,
          redirectTo: '/preferences'
        });
      }
      else {
        // If preferences exist, send response with redirect to /
        return res.status(200).json({
          user,
          redirectTo: '/'
        });
      }
    }
    // If all is good, send response with redirect based on the role
    const redirectTo = user.role === 'landlord' ? '/' :user.role==='admin'?'/admin': '/';

    // Send the redirect URL along with a success message
    return res.status(200).json({
      message: 'Login successful',
      redirectTo,
      user
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single user function
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Register function
const register = async (req, res) => {
  const { name, email, password, phone, address, role } = req.body;
  try {
    if (!name || !email || !password || !phone || !address || !role) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if email or phone is already in use
    const [existingEmail, existingPhone] = await Promise.all([
      User.findOne({ email }),
      User.findOne({ phone }),
    ]);

    if (existingEmail) {
      return res.status(409).json({
        errorType: "Conflict",
        message: "Email is already in use",
      });
    }

    if (existingPhone) {
      return res.status(409).json({
        errorType: "Conflict",
        message: "Phone number is already in use",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      address, // Include the address field
      role,
    });

    const savedUser = await newUser.save();
    res.status(201).json({ message: "User created", user: savedUser });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.keys(error.errors).map((key) => ({
        field: key,
        message: error.errors[key].message,
      }));
      return res.status(400).json({ errors });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  try {
    const updatedUser = await updateUserProfile(id, updateData);
    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

const deleteUser = async (req, res) => {
  try {
    // Find the user by ID
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete associated data
    if (user.role === "tenant") {
      await TenantPreferences.deleteMany({ tenant_id: user._id }); // Delete tenant preferences
      await Booking.deleteMany({ tenant_id: user._id }); // Delete tenant bookings
    } else if (user.role === "landlord") {
      // Delete landlord properties
      const properties = await Property.find({ owner_id: user._id });
      const propertyIds = properties.map((property) => property._id);

      await Property.deleteMany({ owner_id: user._id }); // Delete properties
      await Booking.deleteMany({ property_id: { $in: propertyIds } }); // Delete bookings for landlord's properties
    }

    // Finally, delete the user
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "User and associated data deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const getUserForAdmin = async (req, res) => {
  try {
    // Find users where role is not 'admin'
    const users = await User.find({ role: { $ne: "admin" } });
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = { login, getUserById, register, updateUser, getUserForAdmin, deleteUser };