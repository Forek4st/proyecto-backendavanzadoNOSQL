import Ticket from '../models/ticketModel.js'
import jwt from 'jwt-simple'

const createTicket = async (req, res) => {
  try {
    const token = req.headers.authorization

    if (!token) {
      return res.status(403).json({
        msg: 'Authorization header missing'
      })
    }

    const decodedToken = jwt.decode(token, process.env.SECRET)
    const userId = decodedToken._id
    console.log(decodedToken)

    if (!userId) {
      return res.status(403).json({
        msg: 'Invalid token, unable to extract _id'
      })
    }

    const { movie, quantityTickets, ticketValue, totalValue, showTime, seats } =
      req.body

    const newTicket = new Ticket({
      users: [userId],
      movie,
      quantityTickets,
      ticketValue,
      totalValue,
      showTime,
      seats
    })

    const savedTicket = await newTicket.save()

    res.status(201).json({
      message: 'Ticket created successfully',
      ticket: savedTicket
    })
  } catch (error) {
    console.error('Error creating ticket:', error)
    res.status(500).json({ msg: 'Internal server error' })
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
      message: 'Internal server error',
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
      message: 'Internal server error',
      error: err.message
    })
  }
}

export { createTicket, getAllTickets, getTicketByUserId }
