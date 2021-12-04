import mongoose from 'mongoose'
import product from '../models/product.js'

import convertJsonToCsv from '../../service/convertJsonToCSV.js';

const Product = mongoose.model("Product", product);

class ProductController {

  async create(req, res) {
    try {
      const { name, price, description, categorie } = req.body

      const product = await Product.insertMany({
        name,
        price,
        description,
        categorie
      })

      return res.status(200).json(product)
    } catch (err) {
      return res.status(500).json(err)
    }
  }

  async index(req, res) {
    try {
      return res.status(200).json(await Product.find())
    } catch (err) {
      return res.status(500).json(err)
    }
  }

  async update(req, res) {
    try {
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
    } catch (err) {
      return res.status(500).json(err)
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params

      const deleted = await Product.findByIdAndDelete(id)

      if (deleted) {
        return res.status(200).send({ 'message': "Product deleted successfully!" })
      } else {
        return res.status(200).send({ 'message': "There was a error!" })
      }
    } catch (err) {
      return res.status(500).json(err)
    }
  }

  async convertCSV(req, res) {
    try {
      const productsJson = await Product.find({}, {
        _id: 0, __v: 0
      })

      const date = new Date()

      const path = `./xlsx/${("0" + date.getDate()).slice(-2) + '-'
        + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear() + ' '
        + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + `.xlsx`}`

      await convertJsonToCsv(productsJson, path)

      return res.status(200).json({ 'message': 'Producs converted in XLSX successfully' })
    } catch (err) {
      return res.status(500).json(err)
    }
  }
}

export default new ProductController()