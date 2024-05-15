const mongoose = require('mongoose');

const pastrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  stock: { type: Number, required: true },
  quantityWon: { type: Number, default: 0 }
});

module.exports = mongoose.model('Pastry', pastrySchema);
