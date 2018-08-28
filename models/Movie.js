const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;


const movieSchema = new Schema({
  cover_url: {
    type: String,
  },
  description: {
    type: String,
  },
  id: {
    type: String,
  },
  rating: {
    type: Number,
  },
  title: {
    type: String
  }
})

module.exports = mongoose.model('Movie', movieSchema);
