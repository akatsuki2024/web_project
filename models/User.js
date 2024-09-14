const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  name: String,
  collegeId: String,
  branch: String,
  year: String,
  contactNumber: String,
  address: String
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
