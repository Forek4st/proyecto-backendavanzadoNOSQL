import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connect = () => {
  mongoose.connect(process.env.DB_URI)

  const connection = mongoose.connection

  connection.once('open', () => {
    console.log('Successfully connected to MongoDB')
  })

  connection.once('error', () => {
    console.error('Error connecting to MongoDB')
  })
}

export { connect }
