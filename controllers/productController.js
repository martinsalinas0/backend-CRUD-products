const Product = require("../models/product");

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.product);
    if (!product) return res.status(404).send("product not found");
    res.json(product);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getProductReviews = async (req, res) => {
  try {
    
    const product = await Product.findById(req.params.product);
    if (!product) return res.status(404).send("Product not found");

    


  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, category, price } = req.body;
    const product = new Product({ name, category, price });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.addReview = async (req, res) => {
  try {
    const { userName, text } = req.body;
    const product = await Product.findById(req.params.product);
    if (!product) return res.status(404).send('Product not found');

    const review = { userName, text, product: product._id };
    product.reviews.push(review);
    await product.save();

    res.status(201).json(product.reviews[product.reviews.length - 1]);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.product);
    if (!deleted) return res.status(404).send('Product not found');
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const product = await Product.findOne({ 'reviews._id': req.params.review });
    if (!product) return res.status(404).send('Review not found');

    product.reviews.id(req.params.review).remove();
    await product.save();

    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getProducts = async (req, res) => {
  try {
    let { page = 1, category, price, query } = req.query;
    page = parseInt(page);

    let filter = {};
    if (category) filter.category = category;
    if (query) filter.name = { $regex: query, $options: 'i' };

    let sort = {};
    if (price === 'highest') sort.price = -1;
    else if (price === 'lowest') sort.price = 1;

    const totalCount = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .sort(sort)
      .skip((page - 1) * PRODUCTS_PAGE_SIZE)
      .limit(PRODUCTS_PAGE_SIZE);

    res.json({
      page,
      totalPages: Math.ceil(totalCount / PRODUCTS_PAGE_SIZE),
      totalCount,
      products,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};