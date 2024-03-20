import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  dni: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['ADMIN', 'EMPLOYEE', 'CLIENT'],
    default: 'CLIENT'
  }
})

export default mongoose.model('User', userSchema)
