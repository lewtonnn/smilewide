const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post',
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  text: {
    type: String,
    required: true,
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    }],
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;