const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const Product = require("../models/productsModel.js");

const app = express();
app.use(express.json());

// mongoose
//   .connect("mongodb://localhost/products")
//   .then(() => console.log("mongoDB connected"))
//   .catch((err) => console.error(err));

//routes
// app.use('/api', productRoutes)

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server Connected. \nServer is running on port: ${PORT}`);
});

// server.on("error", (err) => {
//   console.error(`Error starting server: ${err.message}`);
//   process.exit(1);
// });

//middleware for Authentication

module.exports = app;

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  price: Number,
  category: String,
  imageUrl: String,
  stockNumber: Number,
});

const ProductModel = mongoose.model("product", productSchema);

// const productOne = new ProductModel ({
//   name: 'Sleek Plastic Keyboard',
//   price: 0.00,
//   category: "Jewelry",
//   imageUrl: 'khngfa',
//   stockNumber: 719
// })

// const productTwo = new ProductModel ({
//   name: 'Incredible Wooden Ball',
//   price: 0.00,
//   category: "Garden",
//   imageUrl: 'khngfa',
//   stockNumber: 380
// })
// const productThree = new ProductModel ({
//   name: 'Toasty Concrete Soap',
//   price: 0.00,
//   category: "Games",
//   imageUrl: 'khngfa',
//   stockNumber: 340
// })
// const productFour = new ProductModel ({
//   name: 'Small Fresh Bacon',
//   price: 0.00,
//   category: "Beauty",
//   imageUrl: 'khngfa',
//   stockNumber: 731
// })
// const productFive = new ProductModel ({
//   name: 'Practical Fresh Shirt',
//   price: 0.00,
//   category: "Home",
//   imageUrl: 'khngfa',
//   stockNumber: 276
// })

// productTwo.save()
// .then((doc) => {
//   console.log('new product SAves')
// })
// .catch((err) => {
//   console.error('Errror saving new product', err)
// })
// .finally(() => {
//   mongoose.connection.close()
//   .then(()=>{
//     console.log("MongoDB connection  closes")
//   })
// })

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
