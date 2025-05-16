const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://localhost/products")
  .then(() => console.log("mongoDB connected"))
  .catch((err) => console.error(err));

//routes
// app.use('/api', productRoutes)

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server Connected. \nServer is running on port: ${PORT}`);
});

server.on("error", (err) => {
  console.error(`Error starting server: ${err.message}`);
  process.exit(1);
});

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


const ProductModel = mongoose.model('product', productSchema)

const productOne = new ProductModel ({ 
  name: 'T-shirt', 
  price: 32, 
  category: "clothes",
  imageUrl: 'khngfa', 
  stockNumber: 43
})


productOne.save() 
  .then((doc) => { 
    console.log('new product SAves')
  })
  .catch((err) => { 
    console.error('Errror saving new product', err)
  })
  .finally(() => { 
    mongoose.connection.close()
    .then(()=>{ 
      console.log("MongoDB connectio closes")
    })
  })
