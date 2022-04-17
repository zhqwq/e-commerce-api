const router = require('express').Router()
const Product = require('../models/Product.js')
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middleware/verifyToken.js')

// create
router.post('/', verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body)
  try {
    const savedProduct = await newProduct.save()
    res.status(200).json(savedProduct)
  } catch (err) {
    res.status(500).json(err)
  }
})

// update
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body
      },
      { new: true }
    )
    res.status(200).json(updatedProduct)
  } catch (err) {
    res.status(500).json(err)
  }
})

// delete
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id)
    res.status(200).json(deletedProduct)
  } catch (err) {
    res.status(500).json(err)
  }
})

// get
router.get('/find/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    res.status(200).json(product)
  } catch (err) {
    res.status(500).json(err)
  }
})

// get all
router.get('/all', verifyTokenAndAdmin, async (req, res) => {
  const { category } = req.query
  try {
    let products
    if (category) {
      products = await Product.find({
        categories: {
          $in: [category]
        }
      })
    } else {
      products = await Product.find()
    }
    res.status(200).json(products)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
