const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dice: { type: [Number], required: true }, // Stocker les résultats des dés
  score: { type: Number, required: true }, // Calculer le score si nécessaire
  result: { type: String, required: true }, // Stocker la combinaison obtenue
  pastryWon: { type: String }, // Pâtisserie gagnée
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Game', gameSchema);
