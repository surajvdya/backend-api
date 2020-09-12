const bcrypt = require('bcryptjs');
const multer = require('multer');
const auth = require('jsonwebtoken');

const product = require('../model/product');

exports.newProduct = (req, res, next) => {
    console.log(req.file)
    const newProduct = new product({
        product_name: req.body.product_name,
        product_category: req.body.product_category,
        base_price: req.body.base_price,
        start_date: req.body.start_date,
        product_Image: req.file.filename,
        end_date: req.body.end_date,
        highest_bid: req.body.base_price,
        email: req.body.email,
    })

    newProduct.save().then(res.send({
        status: "Success",
        message: "Product Sucessfully Added",
    }))
        .catch(err => console.log(err))
}

exports.products = (req, res, next) => {
    product.find().then(product => {
        res.send(product)
    }).catch(err => res.send(err))
}

exports.fproducts = (req, res, next) => {
    console.log("fproducts");
    let today =new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate());
    product.find({end_date: {$gte: today}}).then(product => {
    console.log("fproducts new",product);

        res.send(product)
    }).catch(err => res.send(err))
    
}

exports.oneproducts = (req, res, next) => {
    product.find({_id: req.params.id}).then(product => {
        res.send(product)
    }).catch(err => res.send(err))
}

exports.update = (req, res, next) => {
    product.findOneAndUpdate({_id: req.params.id},{
        product_name: req.body.product_name,
        product_category: req.body.product_category,
        base_price: req.body.base_price,
        start_date: req.body.start_date,
        product_Image: req.file.filename,
        end_date: req.body.end_date,
        highest_bid: req.body.highest_bid,
    }
        ).then(
        res.send(({
            status: "Success",
            message: "Product Sucessfully Updated",
        }))).catch(err => res.send(err))
}
exports.updateBid = (req, res, next) => {
  console.log(req.body.highest_bid)
  console.log(req.user.email)
    product.findOneAndUpdate({_id: req.params.id},{
        email: req.user.email,
        highest_bid: req.body.highest_bid,
    }
        ).then(products=>{
        res.send({message:"ok"})}).catch(err => res.send(err))
        //allproduct list display
}

exports.delete = (req, res, next) => {
    product.findOneAndDelete({_id: req.params.id})    
    .then(res.send({
        status: "Success",
        message: "Product Sucessfully Deleted",
    })).catch(err => res.send(err))
}