const User = require('../models/userSchema');
const mongoose = require("mongoose"); // Assuming User model is in `models` folder

/**
 * Update user by ID
 * @param {String} userId - ID of the user to update
 * @param {Object} updateData - Fields to update
 * @returns {Object} Updated user
 */
const updateUserProfile = async (userId, updateData) => {
    try {
        // Validate the user ID
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error('Invalid user ID');
        }

        // Update the user
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updateData },
            { new: true, runValidators: true } // Return updated user and run schema validators
        );

        if (!updatedUser) {
            throw new Error('User not found');
        }

        return updatedUser;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = updateUserProfile;
