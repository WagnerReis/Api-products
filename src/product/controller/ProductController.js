const mongoose = require("mongoose");
const product = require("../models/product.js");

const convertJsonToCsv = require("../../service/convertJsonToCSV.js");

const Product = mongoose.model("Product", product);

class ProductController {
  async create(req, res) {
    try {
      const { name, price, description, categorie } = req.body;

      if (name === undefined) {
        throw new Error("body cannot be empty.");
      }

      const product = await Product.insertMany({
        name,
        price,
        description,
        categorie,
      });

      return res.status(200).json(product);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async index(req, res) {
    try {
      const product = await Product.find();

      if (!product) {
        return res.status(404).json({ message: "product not found." });
      }
      return res.status(200).json(product);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async findProduct(req, res) {
    try {
      const product = await Product.findOne();

      if (!product) {
        return res.status(404).json({ message: "product not found." });
      }
      return res.status(200).json(product);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, price, description, categorie } = req.body;

      let product = await Product.findByIdAndUpdate(id, {
        name,
        price,
        description,
        categorie,
      });

      if (product) {
        return res.status(200).send({ "message ": "Updated successfully!" });
      } else {
        return res.status(500).send("Error!");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const deleted = await Product.findByIdAndDelete(id);

      if (deleted) {
        return res
          .status(200)
          .send({ message: "Product deleted successfully!" });
      } else {
        return res.status(200).send({ message: "There was a error!" });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async convertCSV(req, res) {
    try {
      const productsJson = await Product.find(
        {},
        {
          _id: 0,
          __v: 0,
        }
      );

      const date = new Date();

      const path =
        "./xlsx/" +
        date.getDate() +
        "-" +
        date.getMonth() +
        "-" +
        date.getFullYear() +
        " " +
        date.getHours() +
        "-" +
        date.getMinutes() +
        "-" +
        date.getSeconds() +
        ".xlsx";
      await convertJsonToCsv(productsJson, path);

      return res
        .status(200)
        .json({ message: "Producs converted in XLSX successfully" });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

module.exports = new ProductController();
