const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');

router.get('/products/:product', controller.getProductById);
router.get('/products/:product/reviews', controller.getProductReviews);
// add others:
router.post('/products', controller.createProduct);
router.post('/products/:product/reviews', controller.addReview);
router.delete('/products/:product', controller.deleteProduct);
router.delete('/reviews/:review', controller.deleteReview);
router.get('/products', controller.getProducts); // with filtering/sorting/search

module.exports = router;