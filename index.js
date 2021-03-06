const express = require("express");
const mongoose = require("mongoose");
const { Router } = require("express");

const ProductController = require("./src/product/controller/ProductController.js");
const verifyIfProductExists = require("./src/product/middleware/ProductMiddleware.js");

mongoose.connect("mongodb://localhost:27017/product", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
const router = Router();

app.use(express.json());
app.use("/", router);

router.get("/", ProductController.index);
router.get("/find/", ProductController.findProduct);
router.post("/create", ProductController.create);
router.put("/update/:id", verifyIfProductExists, ProductController.update);
router.delete("/delete/:id", verifyIfProductExists, ProductController.delete);
router.get("/convertcsv", ProductController.convertCSV);

module.exports = app;
