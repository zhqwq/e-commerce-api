const router = require('express').Router()
const User = require('../models/User.js')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

// Register
router.post('/register', async (req, res) => {
  // create a new document object
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
  })

  // save the new user to user collection
  try {
    const savedUsr = await newUser.save()
    res.json(savedUsr)
  } catch (error) {
    res.status(500).json(error)
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    // check user's username and password
    const user = await User.findOne({ username: req.body.username })
    if (!user) {
      res.status(401).json('The username or password is incorrect')
    }
    const password = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8)
    if (password !== req.body.password) {
      res.status(401).json('The username or password is incorrect')
    }

    // sign token
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin
      },
      process.env.SECRET_KEY,
      {
        expiresIn: '3d'
      }
    )

    // return token and user's info
    res.json({ message: 'Login successful', user, accessToken })
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
