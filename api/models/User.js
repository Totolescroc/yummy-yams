const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  attempts: { type: Number, default: 0 }  // Ajout pour compter les tentatives de jeu
});

module.exports = mongoose.model('User', userSchema);
