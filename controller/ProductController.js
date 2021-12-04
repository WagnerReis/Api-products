import mongoose from 'mongoose'
import product from '../models/product.js'
import xlsx from 'xlsx'
import fs from 'fs'

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

    return res.status(200).json(product)
  }

  async index(req, res) {
    return res.status(200).json(await Product.find())
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

  async convertCSV(req, res) {
    const productsJson = await Product.find({},{
      _id: 0, __v: 0
      })
      
    const workSheet = xlsx.utils.json_to_sheet(productsJson.map(p => p.toJSON()))
    const workBook = xlsx.utils.book_new()

    xlsx.utils.book_append_sheet(workBook, workSheet, 'products')

    xlsx.write(workBook, { bookType: 'xlsx', type: 'buffer' })
    xlsx.write(workBook, { bookType: 'xlsx', type: 'binary' })
    
    const date = new Date()

    xlsx.writeFile(workBook, `./xlsx/${("0" + date.getDate()).slice(-2) + '-'
      + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear() + ' '
      + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() +`.xlsx`}`)

    return res.status(200).send({ 'message': 'Producs converted in XLSX successfully' })
  }
}

export default new ProductController()