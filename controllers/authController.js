import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jwt-simple'

const register = async (req, res) => {
  try {
    if (
      !req.body.dni ||
      !req.body.name ||
      !req.body.lastName ||
      !req.body.dateOfBirth ||
      !req.body.phoneNumber ||
      !req.body.email ||
      !req.body.userName ||
      !req.body.password ||
      !req.body.role
    ) {
      return res.status(400).json({
        msg: 'Failed to register, missing fields',
        error: 'Missing fields'
      })
    }

    const newPassword = await bcrypt.hash(req.body.password, 10)

    req.body.password = newPassword

    const newUser = await User.create(req.body)

    newUser.password = undefined
    return res.json({
      msg: 'User created successfully',
      user: newUser
    })
  } catch (error) {
    res.status(500).json({
      msg: 'Error creating user',
      error
    })
  }
}

const login = async (req, res) => {
  if (!req.body.password || !req.body.userName) {
    return res.status(400).json({
      msg: 'Incorrect credentials'
    })
  }

  try {
    // Buscamos user con ese correo
    const user = await User.findOne({
      userName: req.body.userName
    })

    if (!user) {
      return res.status(404).json({
        msg: 'User not found'
      })
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    )

    if (isPasswordCorrect) {
      const payload = {
        userName: user.userName,
        role: user.role
      }
      const token = jwt.encode(payload, process.env.SECRET)

      return res.json({
        msg: 'Successfully logged in',
        token
      })
    } else {
      return res.status(401).json({
        msg: 'Incorrect credentials'
      })
    }
  } catch (error) {
    res.status(500).json({
      msg: 'Error logging in',
      error
    })
  }
}

export { register, login }
