const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  const token = req.headers.token
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
      if (err) {
        res.status(403).json('Token is not valid.')
      }
      req.payload = payload // token's payload
      next()
    })
  } else {
    return res.status(401).json('You are not authenticated.')
  }
}

const verifyTokenAndAuthrization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.payload.id == req.params.id || req.payload.idAdmin) {
      next()
    } else {
      res.status(401).json('You are not authenticated.')
    }
  })
}

module.exports = { verifyToken, verifyTokenAndAuthrization }
