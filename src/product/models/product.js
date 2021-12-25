const mongoose = require("mongoose");

const product = new mongoose.Schema({
  name: String,
  price: String,
  description: String,
  categorie: String,
});

module.exports = product;
