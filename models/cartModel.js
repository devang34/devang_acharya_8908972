const mongoose = require('mongoose');

// Define the schema for CartItem
const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

// Define the schema for Cart
const cartSchema = new mongoose.Schema({
  cartItems: {
    type: [cartItemSchema],
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

// Create and export the Cart model
module.exports = mongoose.model('Cart', cartSchema);
