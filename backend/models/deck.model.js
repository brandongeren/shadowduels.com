const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deckSchema = new Schema({
  id: {type: String, required: true, unique: true},
  name: {type: String, required: true},
  description: {type: String, required: false},
},
{
  timestamps: true,
});

const Deck = mongoose.model('Deck', deckSchema);
module.exports = Deck;