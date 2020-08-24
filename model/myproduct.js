const mongoose = require('mongoose');
const schema=mongoose.Schema;
const myprodSchema=new schema({
    product_name:{
        type: String,
        required: true
    },
    base_price:{
        type: String,
        required:true,
    },
    product_Image:{
        type:String,
        required:true,
    },
    end_date:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    }
    });
    const myproduct=mongoose.model("myProduct",myprodSchema);

module.exports=myproduct;