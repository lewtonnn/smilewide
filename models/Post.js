const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      url: {
        type: String,
        required: true,
      },
      sectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section',
        required: true,
      },
      tags: [
        {
          type: String,
        },
      ],
      likes: [
        {
          user: {
            type: String,
          },
        }],
    },
    {
      toJSON: { virtuals: true },
      timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
    });

PostSchema.virtual('comments',
    {
      ref: 'Comment',
      localField: '_id',
      foreignField: 'postId',
      justOne: false,
    });

PostSchema.virtual('commentsCount',
    {
      ref: 'Comment',
      localField: '_id',
      foreignField: 'postId',
      count: true,
      justOne: false,
    });

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;