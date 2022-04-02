const router = require('express').Router()
const User = require('../models/User.js')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

// Register 注册
router.post('/register', async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
  })

  try {
    const savedUsr = await newUser.save()
    res.json(savedUsr)
    console.log(savedUsr)
  } catch (error) {
    res.status(500).json(error)
    console.log(error)
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (!user) {
      res.status(401).json('The username or password is incorrect')
    }
    const password = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8)
    if (password !== req.body.password) {
      res.status(401).json('The username or password is incorrect')
    }
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
    res.json({ message: 'Login successful', user, accessToken })
  } catch (error) {
    res.status(500).json(error)
    console.log(error)
  }
})

module.exports = router
