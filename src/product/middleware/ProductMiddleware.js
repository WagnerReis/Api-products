const mongoose = require("mongoose");
const product = require("../models/product.js");

const Product = mongoose.model("Product", product);

module.exports = async function verifyIfProductExists(req, res, next) {
  const { id } = req.params;
  if (mongoose.isValidObjectId(id)) {
    const product = await Product.findById(id);
    product ? next() : res.send({ message: "Product not found." });
  } else {
    return res.status(500).send({ message: "Id invalid." });
  }
};
