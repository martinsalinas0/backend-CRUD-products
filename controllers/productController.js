const Product = require("../models/allModels.js");

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.product);
    if (!product) return res.status(404).send("product not found");
    res.json(product);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

const getProductReviews = async (req, res) => {
  try {
    const product = await Product.findById(req.params.product);
    if (!product) return res.status(404).send("Product not found");
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, category, price } = req.body;
    const product = new Product({ name, category, price });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

const addReview = async (req, res) => {
  try {
    const { userName, text } = req.body;
    const product = await Product.findById(req.params.product);
    if (!product) return res.status(404).send("Product not found");

    const review = { userName, text, product: product.productId };
    product.reviews.push(review);
    await product.save();

    res.status(201).json(product.reviews);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.product);
    if (!deleted) return res.status(404).send("product not found");
    res.json({ message: "product has been deleted" });
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

const deleteReview = async (req, res) => {
  try {
    const product = await Product.findOne({ "reviews._id": req.params.review });
    if (!product) return res.status(404).send("review not found");

    product.reviews.id(req.params.review).remove();
    await product.save();

    res.json({ message: "Review has been deleted" });
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

const getProducts = async (req, res) => {
  try {
    let { category, price, query } = req.query;
    

    let filter = {};
    if (category) filter.category = category;
  



    const totalCount = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .sort(sort)
      .skip((page - 1) * PRODUCTS_PAGE_SIZE)
      .limit(PRODUCTS_PAGE_SIZE);

    res.json({
      page,
      products,
    });
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

moduel.exports = { getProductById };
