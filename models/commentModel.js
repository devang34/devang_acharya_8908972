const mongoose = require('mongoose');

// Comment schema
const commentSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true },
  images: [{ type: String }],
  text: { type: String, required: true },
});

// Create the Comment model
module.exports = mongoose.model('Comment', commentSchema);
