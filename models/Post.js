const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
      sectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'section',
        required: true,
      },
      likes: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
          },
        }],
    },
    {
      timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
    });

const Post = mongoose.model('posts', PostSchema);

module.exports = Post;