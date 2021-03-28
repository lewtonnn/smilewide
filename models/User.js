const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
      },
      password: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
        default: 'https://smilewide.s3.eu-central-1.amazonaws.com/posts/default-user-img.jpeg',
      },
      bio: {
        type: String,
      },
    },
    {
      timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
    });

const User = mongoose.model('users', UserSchema);

module.exports = User;