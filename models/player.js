const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  stats: { type: String, required: true },
  country: { type: String, required: true },
});

module.exports = mongoose.model('Player', playerSchema);
