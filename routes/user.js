const router = require('express').Router()
const User = require('../models/User.js')
const { verifyTokenAndAuthrization } = require('../middleware/verifyToken.js')

// Update user's information
router.put('/:id', verifyTokenAndAuthrization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
  }
  // find user by Id and update user's information'
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body
      },
      { new: true }
    )
    res.status(200).json(updatedUser)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
