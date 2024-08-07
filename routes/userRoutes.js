// Import required modules
const express = require('express');
const userController = require('../controllers/userController');

// Create the router instance
const router = express.Router();

// Define routes
router.post('/', userController.createUser);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

router.post('/signup', userController.signup);

// Login endpoint
router.post('/login', userController.login);

// Export the router
module.exports = router;
