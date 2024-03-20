import { connect } from './config.js'
import express from 'express'
import userRoutes from './routes/userRoutes.js'
import movieRoutes from './routes/movieRoutes.js'
import ticketRoutes from './routes/ticketRoutes.js'
import authRoutes from './routes/authRoutes.js'

const PORT = 3500
const api = express()
connect()

api.use(express.json())

api.use('/users', userRoutes)
api.use('/movies', movieRoutes)
api.use('/tickets', ticketRoutes)
api.use('/auth', authRoutes)

api.listen(PORT, () => {
  console.log(`API running on ${PORT}`)
})
