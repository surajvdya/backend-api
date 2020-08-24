const express = require('express');
const myproductController = require('../controller/myproductController');
const upload=require('../controller/upload');
const route = express.Router();
const auth = require('../auth');

route.get("/",(req,res,next)=>{
    res.send("products Route")
})

route.route('/addmyproduct')
.post(auth.verifyUser,auth.verifyUser,myproductController.newmyProduct);

route.get('/myproducts',auth.verifyUser,myproductController.viewMyProduct)
module.exports=route;