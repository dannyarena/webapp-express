const express = require('express');
const router = express.Router();
const { getAllMovies, getMovieById, addReview } = require('../controllers/moviesController');

router.get('/', getAllMovies);
router.get('/:id', getMovieById);
router.post('/:id/reviews', addReview);

module.exports = router;