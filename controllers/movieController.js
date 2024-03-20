import Movie from '../models/movieModel.js'

const createMovie = async (req, res) => {
  try {
    const newMovie = await Movie.create(req.body)
    res.status(201).json({
      message: 'Movie created successfully',
      movie: newMovie
    })
  } catch (err) {
    res.status(500).json({
      message: 'Error creating movie',
      error: err
    })
  }
}

const getAllMovies = async (req, res) => {
  try {
    const allMovies = await Movie.find()
    const movieCount = allMovies.length
    res.status(200).json({
      message: `${movieCount} Movies found successfully`,
      movies: allMovies
    })
  } catch (err) {
    res.status(500).json({
      message: 'Error finding movies',
      error: err.message
    })
  }
}

const getMovieByName = async (req, res) => {
  try {
    const getMovieByName = await Movie.findOne({ name: req.params.name })
    if (getMovieByName) {
      res.status(200).json({
        message: 'Movie found successfully',
        movie: getMovieByName
      })
      return getMovieByName
    } else {
      res.status(404).json({
        message: 'Movies not found for name ' + req.params.name
      })
    }
  } catch (err) {
    res.status(500).json({
      message: 'Error finding movie',
      error: err.message
    })
  }
}

const getMoviebyReleaseDate = async (req, res) => {
  try {
    const getMovieByReleaseDate = await Movie.findOne({
      year: req.params.year
    })
    if (getMovieByReleaseDate) {
      res.status(200).json({
        message: 'Movie found successfully',
        movie: getMovieByReleaseDate
      })
      return getMovieByReleaseDate
    } else {
      res.status(404).json({
        message: 'Movies not found for year ' + req.params.year
      })
    }
  } catch (err) {
    res.status(500).json({
      message: 'Error finding movie',
      error: err.message
    })
  }
}

const getMovieByRating = async (req, res) => {
  try {
    const getMovieByRating = await Movie.findOne({ rating: req.params.rating })
    if (getMovieByRating) {
      res.status(200).json({
        message: 'Movie found successfully',
        movie: getMovieByRating
      })
      return getMovieByRating
    } else {
      res.status(404).json({
        message: 'Movies not found for rating ' + req.params.rating
      })
    }
  } catch (err) {
    res.status(500).json({
      message: 'Error finding movie',
      error: err.message
    })
  }
}

const getMovieByGenre = async (req, res) => {
  try {
    const getMovieByGenre = await Movie.findOne({ genre: req.params.genre })
    if (getMovieByGenre) {
      res.status(200).json({
        message: 'Movie found successfully',
        movie: getMovieByGenre
      })
      return getMovieByGenre
    } else {
      res.status(404).json({
        message: 'Movies not found for genre ' + req.params.genre
      })
    }
  } catch (err) {
    res.status(500).json({
      message: 'Error finding movie',
      error: err.message
    })
  }
}

export {
  createMovie,
  getAllMovies,
  getMoviebyReleaseDate,
  getMovieByName,
  getMovieByRating,
  getMovieByGenre
}
