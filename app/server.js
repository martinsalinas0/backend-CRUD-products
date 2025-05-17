const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const Product = require("../models/productsModel.js");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server Connected. \nServer is running on port: ${PORT}`);
});

//ROUTES

//GET /products/:product:
// Returns a specific product by its id

app.get("/api/product/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//GET /products
//Returns all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//POST /products
//adds a new product
app.post("/api/products", async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//DELETE /products/:productId
//delets a product byId
app.delete("/api/product/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    const productToDelete = await Product.findByIdAndDelete(productId);
    if (!productToDelete) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ messgage: "product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect("mongodb://localhost/products")
  .then(() => {
    console.log("Connected to database!");
    server.on("error", (err) => {
      console.error(`Error starting server: ${err.message}`);
      process.exit(1);
    });
  })
  .catch(() => {
    console.log("Connection failed");
  });

module.exports = app;
