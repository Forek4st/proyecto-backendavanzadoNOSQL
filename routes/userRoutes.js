import express from 'express'
import {
  getUserById,
  getAllUsers,
  getUserByRole
} from '../controllers/userController.js'
import { authValidator } from '../middlewares/authValidator.js'
import { isAdmin } from '../middlewares/isAdmin.js'
import { isEmployee } from '../middlewares/isEmployee.js'

const userRoutes = express.Router()

userRoutes.get('/', authValidator, isEmployee, getAllUsers)
userRoutes.get('/:userId', authValidator, isAdmin, getUserById)
userRoutes.get('/role/:userRole', getUserByRole)

export default userRoutes
