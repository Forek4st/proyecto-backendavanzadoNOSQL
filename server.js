import { connect } from './config.js'
import express from 'express'
import userRoutes from './routes/userRoutes.js'
import movieRoutes from './routes/movieRoutes.js'
import ticketRoutes from './routes/ticketRoutes.js'
import authRoutes from './routes/authRoutes.js'

const PORT = 8000
const api = express()

connect()

api.use(express.json())

api.use('/users', userRoutes)
api.use('/movies', movieRoutes)
api.use('/tickets', ticketRoutes)
api.use('/auth', authRoutes)

// Manejo de errores en formato invalido del JSON en Postman
api.use((error, req, res, next) => {
  if (error instanceof SyntaxError && 'body' in error) {
    res.status(400).json({
      message: 'Error: Invalid JSON format',
      error: error.message
    })
  } else {
    res.status(500).json(
      {
        message: 'Error: Internal server error',
        error: error.message
      }
    )
  }
})

api.listen(PORT, () => {
  console.log(`API running on ${PORT}`)
})
