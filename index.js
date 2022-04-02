const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()

const userRoute = require('./routes/user.js')
const authRoute = require('./routes/auth.js')

// connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('DB connection established'))
  .catch(err => console.log(err))

// middlware
app.use(express.json())

// test api
app.get('/', (req, res) => {
  res.json({ message: 'Hello World' })
})

app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)

app.listen(5000, () => {
  console.log('Listening on port 5000')
})
