const mongoose = require("mongoose");

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
      required: false,
    },
    category: {
      type: String,
      required: true,
    },
    reviews: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        User: {
          type: String,
          required: [true, "Please enter user name"],
        },

        Stars: {
          type: Number,
          required: true,
          default: 1,
        },

        reviewText: {
          type: String,
          required: false,
        },
        datePosted: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    default: [],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
