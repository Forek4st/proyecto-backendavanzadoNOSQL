import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jwt-simple'
// import nodemailer from 'nodemailer'

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

/* const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD
  }
}) */

/* const resetPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
      return res.status(404).json({
        msg: 'No user found with this email'
      })
    }

    const token = crypto.randomBytes(20).toString('hex')

    user.resetPasswordToken = token
    user.resetPasswordExpires = Date.now() + 3600000 // 1 hour

    await user.save()

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_ADDRESS,
      subject: 'Password Reset',
      text: `Please click on the following link to reset your password: \n\n${process.env.CLIENT_URL}/reset-password/${token}\n\nIf you did not request this, please ignore this email.`
    }

    const htmlFilePath = path.join(process.cwd(), 'Public', 'resetPassword.html')

    mailOptions.html = fs.readFileSync(htmlFilePath, 'utf-8')

    await transporter.sendMail(mailOptions)

    res.status(200).json({
      msg: `An email has been sent to ${user.email} with further instructions.`
    })
  } catch (error) {
    res.status(500).json({
      msg: 'Error resetting password',
      error: error.message
    })
  }
} */
export { register, login } // resetPassword }
