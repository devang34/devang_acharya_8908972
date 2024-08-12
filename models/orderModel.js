const mongoose = require('mongoose');

// Define the order schema
const orderSchema = new mongoose.Schema({
  orderItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  name: { type: String, required: true },
  addressDetails: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true },
  country: { type: String, required: true },
  creditCardNumber: { type: String, required: true },
  expiry: { type: String, required: true },
  cvv: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: { type: Date, default: Date.now },
});

// Create the Order model
module.exports = mongoose.model('Order', orderSchema);
