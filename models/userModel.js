// Import required modules
const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  purchaseHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  shippingAddress: { type: String },
});

// Create and export the User model
module.exports = mongoose.model('User', userSchema);
