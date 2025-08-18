const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  content: String,
  author: String,
  rating: Number
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);
