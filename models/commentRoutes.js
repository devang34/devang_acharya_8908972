const express = require('express');
const commentController = require('../controllers/commentController');

const router = express.Router();

// GET /comments - Get all comments
router.get('/', commentController.getAllComments);

// POST /comments - Create a new comment
router.post('/', commentController.createComment);

// GET /comments/:id - Get comment by Id
router.get('/:id', commentController.getCommentById);

// PUT /comments/:id - Update an existing comment
router.put('/:id', commentController.updateComment);

// DELETE /comments/:id - Delete a comment
router.delete('/:id', commentController.deleteComment);

module.exports = router;
