const mongoose = require('mongoose');
const Movie = mongoose.model('Movie');

exports.getMovies = async (req, res) => {
  const movies = await Movie.find()
  res.render('movies', {
  	title: 'Movies',
  	movies
  });
};
