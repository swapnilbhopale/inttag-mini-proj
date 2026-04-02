const express = require('express')
const authMiddleWare = require('../middleware/authMiddleware')
const {createMovie, getAllMovies} = require('../services/movieService')
const router = express.Router()

// create movie
router.post('/movies', authMiddleWare, createMovie)

// get all movies
router.get('/movies', getAllMovies)

module.exports = router
