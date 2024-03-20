import mongoose from 'mongoose'

const ticketSchema = new mongoose.Schema({
  users: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  quantityTickets: {
    type: Number,
    required: true
  },
  ticketValue: {
    type: Number,
    required: true
  },
  totalValue: {
    type: Number,
    required: true
  },
  showTime: {
    type: Date,
    required: true
  },
  seats: {
    type: [String],
    required: true
  }
})

export default mongoose.model('Ticket', ticketSchema)
