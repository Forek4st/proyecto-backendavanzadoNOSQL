import mongoose from 'mongoose'

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  director: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  genre: {
    type: String,
    required: true
  }
})

export default mongoose.model('Movie', movieSchema)
