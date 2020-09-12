const express = require('express');
const productController = require('../controller/productController');
const upload = require('../controller/upload');
const route = express.Router();
const auth = require('../auth');

// route.get("/", (req, res, next) => {
//     res.send("products Route")
// })
route.route('/')
    .get(productController.fproducts)

route.route('/addproduct')
    .get(productController.products)
    .post(auth.verifyUser, auth.verifyAdmin, upload, productController.newProduct);

route.route('/:id')
    .get(productController.oneproducts)
    .patch(upload, productController.update)
    .delete(productController.delete);

route.patch('/bid/:id', auth.verifyUser, productController.updateBid)
module.exports = route;