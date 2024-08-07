const cartModel = require('../models/cartModel');
const OrderModel = require('../models/orderModel');

// Get order by Id
const getOrderById = async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new order
const createOrder = async (req, res) => {
  try {
    const newOrder = await OrderModel.create(req.body);
    cartModel.deleteMany({ user: req?.body?.user });
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an existing order
const updateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderItems, user, date } = req.body;
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      orderId,
      { orderItems, user, date },
      { new: true }
    );
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an order
const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await OrderModel.findByIdAndDelete(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getOrderById,
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder,
};
