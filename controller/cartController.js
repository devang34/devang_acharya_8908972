const CartModel = require('../models/cartModel');

// Create a new cart
exports.createCart = async (req, res) => {
  try {
    const { cartItems, user } = req.body;
    const cart = new CartModel({ cartItems, user });
    const savedCart = await cart.save();

    res.status(201).json(savedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve all carts
exports.getCarts = async (req, res) => {
  try {
    const filter = {};
    if (req?.query?.userId) {
      filter.user = req?.query?.userId;
    }
    const carts = await CartModel.find(filter).populate('cartItems.product');
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve a cart by ID
exports.getCartById = async (req, res) => {
  try {
    const { cartId } = req.params;
    const cart = await CartModel.findById(cartId);

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a cart by ID
exports.updateCartById = async (req, res) => {
  try {
    // const { cartId } = req.params;
    const { cartItems, user } = req.body;
    const updatedCart = await CartModel.findOneAndUpdate(
      { user },
      { cartItems, user },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).json({
        error: 'User Cart not found, Create new user and signup again',
      });
    }

    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a cart by ID
exports.deleteCartById = async (req, res) => {
  try {
    const { cartId } = req.params;
    const deletedCart = await CartModel.findByIdAndDelete(cartId);

    if (!deletedCart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    res.status(200).json({ message: 'Cart deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
