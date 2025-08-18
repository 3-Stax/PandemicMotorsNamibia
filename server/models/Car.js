const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  fuel: String,
  transmission: String,
  type: String,
  images: [String],
  price: String,
  description: String
}, { timestamps: true });

module.exports = mongoose.model('Car', carSchema);
