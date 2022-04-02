const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    products: [
      {
        prductId: { type: String },
        quantity: { type: Number, default: 1 }
      }
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: 'pending' }
  },
  { timestamp: true } // createAt, updateAt
)

module.exports = mongoose.model('Order', OrderSchema)
