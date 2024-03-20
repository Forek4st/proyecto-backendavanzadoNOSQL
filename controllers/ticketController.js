import Ticket from '../models/ticketModel.js'
import User from '../models/userModel.js'
import Movie from '../models/movieModel.js'

const createTicket = async (req, res) => {
  try {
    const {
      user,
      movie,
      quantityTickets,
      ticketValue,
      totalValue,
      showTime,
      seats
    } = req.body

    if (
      !user ||
      !movie ||
      !quantityTickets ||
      !ticketValue ||
      !totalValue ||
      !showTime ||
      !seats
    ) {
      return res.status(400).json({
        msg: 'Missing required fields'
      })
    }

    const userPromises = user.map(async (userId) => {
      const userDb = await User.findById(userId)
      if (!userDb) {
        throw new Error(`User with ID ${userId} does not exist`)
      }
      return userDb._id
    })

    const confirmedUsers = await Promise.all(userPromises)

    const movieDb = await Movie.findById(movie)
    if (!movieDb) {
      return res.status(400).json({
        msg: 'The specified movie does not exist in the database'
      })
    }

    const newTicket = await Ticket.create({
      users: confirmedUsers,
      movie: movieDb._id,
      quantityTickets,
      ticketValue,
      totalValue,
      showTime,
      seats
    })

    return res.status(201).json({
      message: 'Ticket created successfully',
      newTicket
    })
  } catch (error) {
    res.status(500).json({
      msg: 'Error creating the ticket',
      error: error.message
    })
  }
}

const getAllTickets = async (req, res) => {
  try {
    const allTickets = await Ticket.find()
      .populate('users', 'id name lastName email phoneNumber')
      .populate('movie', 'name')
    const ticketCount = allTickets.length
    if (ticketCount > 0) {
      res.status(200).json({
        message: `${ticketCount} Tickets found successfully`,
        tickets: allTickets
      })
    } else {
      res.status(404).json({
        error: 'No tickets found'
      })
    }
  } catch (err) {
    res.status(500).json({
      message: 'Error finding tickets',
      error: err.message
    })
  }
}

const getTicketByUserId = async (req, res) => {
  try {
    const tickets = await Ticket.find({ users: req.params.userId })
      .populate('users', 'id name lastName email phoneNumber')
      .populate('movie', 'name')
    if (!tickets || tickets.length === 0) {
      return res.status(404).json({
        message: 'Tickets not found for this user'
      })
    }
    const ticketCount = tickets.length
    res.status(200).json({
      message: ` ${ticketCount} tickets found successfully`,
      tickets
    })
  } catch (err) {
    res.status(500).json({
      message: 'Error finding tickets',
      error: err.message
    })
  }
}

export { createTicket, getAllTickets, getTicketByUserId }
