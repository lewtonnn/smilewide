const mongoose = require('mongoose');

const SectionSchema = new mongoose.Schema({
      title: {
        type: String,
        required: true,
        unique: true,
      },
      picture: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
    });

const Section = mongoose.model('Section', SectionSchema);

module.exports = Section;