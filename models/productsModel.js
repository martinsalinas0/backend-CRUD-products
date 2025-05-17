const mongoose = require("mongoose");
const ReviewSchema = require('./reviewsModel.js')

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
    },

    price: {
      type: Number,
      required: true,
      default: 0,
    },

    image: {
      type: String,
      required: false,
    },
    stockNumber: { 
      type: Number, 
      required: false
    }, 
    category: {
      type: String, 
      required: true,
    }, 
    reviews: [ReviewSchema], 
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
