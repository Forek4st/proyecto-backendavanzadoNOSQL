import express from 'express'
import {
  createMovie,
  getMoviebyReleaseDate,
  getAllMovies,
  getMovieByName,
  getMovieByRating,
  getMovieByGenre
} from '../controllers/movieController.js'
import { authValidator } from '../middlewares/authValidator.js'

const movieRoutes = express.Router()

movieRoutes.post('/', createMovie)
movieRoutes.get('/', getAllMovies)
movieRoutes.get('/date/:year', authValidator, getMoviebyReleaseDate)
movieRoutes.get('/name/:name', authValidator, getMovieByName)
movieRoutes.get('/rating/:rating', authValidator, getMovieByRating)
movieRoutes.get('/genre/:genre', authValidator, getMovieByGenre)

export default movieRoutes
