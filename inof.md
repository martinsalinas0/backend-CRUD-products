✅ GET /products/:product: Returns a specific product by its id
✅ POST /products: Creates a new product in the database
✅ GET /products: Returns all products
✅DELETE /products/:product: Deletes a product by id

GET /products/:product/reviews: Returns ALL the reviews for a product, but limited to 4 at a time. This one will be a little tricky as you'll have to retrieve them out of the products. You should be able to pass in an optional page query parameter to paginate.

POST /products/:product/reviews: Creates a new review in the database by adding it to the correct product's reviews array.

DELETE /reviews/:review: Deletes a review by id
