const multer = require('multer');
const auth = require('jsonwebtoken');

const product = require('../model/product');

exports.newmyProduct = (req, res, next) => {
    console.log(req.user.email)
    console.log(req.body)
    const newmyProduct = new product({
        product_name: req.body.product_name,
        base_price: req.body.base_price,
        product_Image: req.body.product_Image,
        end_date: req.body.end_date,
        email:req.user.email
    })

    newmyProduct.save().then(res.send("Product Sucessfully Added"))
        .catch(err => console.log(err))
}

exports.myproducts = (req, res, next) => {
    product.find().then(products => {
        console.log(myproduct);
        res.send(products)
    }).catch(err => res.send(err))
}

exports.viewMyProduct=(req,res,next)=>{
    product.find({email:req.user.email}).then(products=>{
        console.log(products);
        res.send(products)
    }).catch(err=>res.send(err))
}

