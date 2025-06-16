const express = require('express');
const router = express.Router();
const { getAllMovies, getMoviesById } = ('../controllers/moviesController');

router.get('/', getAllMovies);
router.get('/:id', getMoviesById);

module.exports = router;