const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
const userRoute = require('./routes/user.js')
const authRoute = require('./routes/auth.js')
const productRoute = require('./routes/product.js')
const orderRoute = require('./routes/order.js')
const cartRoute = require('./routes/cart.js')
const checkoutRoute = require('./routes/checkout.js')

// connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('DB connection established'))
  .catch(err => console.log(err))

// middlware
app.use(cors())
app.use(express.json())

// test endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Hello World from e-commerce-api' })
})

app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/product', productRoute)
app.use('/api/order', orderRoute)
app.use('/api/cart', cartRoute)
app.use('/api/checkout', checkoutRoute)

app.listen(5000, () => {
  console.log('Listening on port 5000')
})
