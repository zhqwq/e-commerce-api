const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema(
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
    ]
  },
  { timestamps: true } // createAt, updateAt
)

module.exports = mongoose.model('Cart', CartSchema)
