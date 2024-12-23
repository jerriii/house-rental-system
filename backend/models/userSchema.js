const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['tenant', 'landlord', 'admin'], // Define the roles
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  dateJoined: {
    type: Date,
    default: Date.now,
  },
  // For tenants, this will reference their preferences
  preferences: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TenantPreferences',
  },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
