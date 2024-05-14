const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  score: { type: Number },
  pastryWon: { type: String }
});

module.exports = mongoose.model('Game', gameSchema);
