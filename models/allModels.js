const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  imageUrl: String,
  stockNumber: Number,
});


module.exports = mongoose.model('Product', productSchema)