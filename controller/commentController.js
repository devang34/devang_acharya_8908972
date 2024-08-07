const CommentModel = require('../models/commentModel');

// Get comment by Id
const getCommentById = async (req, res) => {
  try {
    const comment = await CommentModel.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all comments
async function getAllComments(req, res) {
  try {
    const comments = await CommentModel.find();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Create a new comment
async function createComment(req, res) {
  try {
    const { product, user, rating, images, text } = req.body;
    const comment = new CommentModel({ product, user, rating, images, text });
    const savedComment = await comment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Update an existing comment
async function updateComment(req, res) {
  try {
    const { id } = req.params;
    const { product, user, rating, images, text } = req.body;
    const updatedComment = await CommentModel.findByIdAndUpdate(
      id,
      { product, user, rating, images, text },
      { new: true }
    );
    res.json(updatedComment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Delete a comment
async function deleteComment(req, res) {
  try {
    const { id } = req.params;
    await CommentModel.findByIdAndDelete(id);
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  getCommentById,
  getAllComments,
  createComment,
  updateComment,
  deleteComment,
};
