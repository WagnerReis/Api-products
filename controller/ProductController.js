import mongoose from 'mongoose'
import product from '../models/product.js'

const Product = mongoose.model("Product", product);

class ProductController {

  async create(req, res) {
    const { name, price, description, categorie } = req.body

    const product = await Product.insertMany({
      name,
      price,
      description,
      categorie
    })

    return res.json(product)
  }

  async index(req, res) {
    return res.json(await Product.find())
  }

  async update(req, res) {
    const { id } = req.params
    const { name, price, description, categorie } = req.body

    let product = await Product.findByIdAndUpdate(
      id,
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
  }

  async delete(req, res) {
    const { id } = req.params

    const deleted = await Product.findByIdAndDelete(id)

    if (deleted) {
      return res.status(200).send({ 'message': "Product deleted successfully!" })
    } else {
      return res.status(200).send({ 'message': "There was a error!" })
    }
  }
}

export default new ProductController()