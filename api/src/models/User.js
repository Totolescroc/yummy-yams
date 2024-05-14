const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  attempts: { type: Number, default: 0 } // Suivre le nombre de tentatives
});

module.exports = mongoose.model('User', userSchema);
