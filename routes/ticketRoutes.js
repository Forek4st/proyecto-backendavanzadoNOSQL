import express from 'express'
import {
  createTicket,
  getAllTickets,
  getTicketByUserId
} from '../controllers/ticketController.js'
import { isAdmin } from '../middlewares/isAdmin.js'
import { isClient } from '../middlewares/isCient.js'
import { authValidator } from '../middlewares/authValidator.js'

const ticketRoutes = express.Router()

ticketRoutes.post('/', authValidator, isClient, createTicket)
ticketRoutes.get('/', authValidator, isAdmin, getAllTickets)
ticketRoutes.get('/:userId', authValidator, isClient, getTicketByUserId)

export default ticketRoutes
