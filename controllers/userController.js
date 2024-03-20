import User from '../models/userModel.js'

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({}, { password: 0 })

    const userCount = allUsers.length

    res.status(200).json({
      message: `${userCount} Users found successfully`,
      users: allUsers
    })
  } catch (err) {
    res.status(500).json({
      message: 'Error finding users',
      error: err.message
    })
  }
}

const getUserById = async (req, res) => {
  try {
    const getUserById = await User.findById(req.params.userId, { password: 0 })

    if (getUserById) {
      res.status(200).json({
        message: 'User found successfully',
        user: getUserById
      })
      return getUserById
    } else {
      res.status(404).json({
        message: 'User not found'
      })
    }
  } catch (err) {
    res.status(500).json({
      message: 'Error finding user',
      error: err.message
    })
  }
}

const getUserByRole = async (req, res) => {
  try {
    const role = req.params.userRole.toUpperCase()
    if (!['CLIENT'].includes(role)) {
      return res.status(400).json({
        message: 'Invalid role provided'
      })
    }

    const usersByRole = await User.find({ role }, { password: 0 })

    if (usersByRole.length > 0) {
      res.status(200).json({
        message: 'Users found successfully',
        users: usersByRole
      })
    } else {
      res.status(404).json({
        message: 'No users found with the specified role'
      })
    }
  } catch (err) {
    res.status(500).json({
      message: 'Error finding users',
      error: err.message
    })
  }
}

const getUserByRoleAdmin = async (req, res) => {
  try {
    const role = req.params.userRole.toUpperCase()
    if (!['ADMIN', 'EMPLOYEE', 'CLIENT'].includes(role)) {
      return res.status(400).json({
        message: 'Invalid role provided'
      })
    }

    const getUserByRoleAdmin = await User.find({ role }, { password: 0 })

    if (getUserByRoleAdmin.length > 0) {
      res.status(200).json({
        message: 'Users found successfully',
        users: getUserByRoleAdmin
      })
    } else {
      res.status(404).json({
        message: 'No users found with the specified role'
      })
    }
  } catch (err) {
    res.status(500).json({
      message: 'Error finding users',
      error: err.message
    })
  }
}

export { getUserById, getAllUsers, getUserByRole, getUserByRoleAdmin }
