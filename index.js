import express from 'express'
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose'

import product from './models/product.js'

mongoose.connect("mongodb://localhost:27017/product", { useNewUrlParser: true, useUnifiedTopology: true });

const Product = mongoose.model("Product", product);

const app = express()

app.use(express.json())

const products = []

async function verifyIfProductExists(req, res, next) {
  const { id } = req.params
  if (mongoose.isValidObjectId(id)) {
    const product = await Product.findById(id)
    product ? next() : res.send({ 'message': 'Product not found.' })
  } else {
    return res.status(500).send({ 'message': 'Id invalid.' })
  }
}

app.post('/create', async (req, res) => {
  const { name, price, description, categorie } = req.body

  const product = await Product.insertMany({
    id: uuidv4(),
    name,
    price,
    description,
    categorie
  })

  return res.json(product)
})

app.get('/list', async (req, res) => {
  return res.json(await Product.find())
})

app.put('/update/:id', verifyIfProductExists, async (req, res) => {
  const { id } = req.params
  const { name, price, description, categorie } = req.body

  let product = await Product.updateMany(
    {
      id
    },
    {
      name,
      price,
      description,
      categorie
    })

  if (product) {
    return res.status(200).send({ 'message ': 'Updated successfully!' })
  } else {
    return res.status(500).send('Error!')
  }
})

app.delete('/delete/:id', verifyIfProductExists, async (req, res) => {
  const { id } = req.params

  const deleted = await Product.findByIdAndDelete(id)

  if(deleted){
    return res.status(200).send({ 'message': "Product deleted successfully!" })
  }else{
    return res.status(200).send({ 'message': "There was a error!" })
  }  
})

export default app