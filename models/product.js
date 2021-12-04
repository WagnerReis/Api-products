import mongoose from 'mongoose'

const product = new mongoose.Schema({
  name: String,
  price: String,
  description: String,
  categorie: String
})

export default product