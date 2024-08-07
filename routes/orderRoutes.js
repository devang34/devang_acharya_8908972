const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Get all orders
router.get('/:id', orderController.getOrderById);

// Get all orders
router.get('/', orderController.getAllOrders);

// Create a new order
router.post('/', orderController.createOrder);

// Update an existing order
router.put('/:orderId', orderController.updateOrder);

// Delete an order
router.delete('/:orderId', orderController.deleteOrder);

module.exports = router;
