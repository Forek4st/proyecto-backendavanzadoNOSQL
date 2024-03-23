import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jwt-simple'

const register = async (req, res) => {
  try {
    const requiredFields = [
      'dni',
      'name',
      'lastName',
      'dateOfBirth',
      'phoneNumber',
      'email',
      'userName',
      'password',
      'role'
    ]
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          msg: 'Failed to register, missing fields',
          error: `Missing field: ${field}`
        })
      }
    }
    const newPassword = await bcrypt.hash(req.body.password, 10)
    req.body.password = newPassword

    const newUser = await User.create(req.body)

    const payload = {
      _id: newUser._id,
      userName: newUser.userName,
      role: newUser.role
    }
    const token = jwt.encode(payload, process.env.SECRET)

    console.log(payload)

    newUser.password = undefined

    res.status(201).json({
      msg: 'User created successfully',
      token,
      user: newUser
    })
  } catch (error) {
    res.status(500).json({
      msg: 'Error creating user',
      error: error.message
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
        _id: user._id,
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
