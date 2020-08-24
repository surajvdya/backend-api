const mongoose = require('mongoose');
const schema=mongoose.Schema;
const productschema= new schema({
product_name:{
    type: String,
    required: true
},
product_category:{
    type: String,
    required: true
},
base_price:{
    type: String,
    required:true,
},
start_date:{
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
highest_bid:{
    type:String,
   required:true,
},
email:{
    type:mongoose.Schema.Types.String,
    required:true,
    default:"no",
    ref: "User"
}
});
const product=mongoose.model("Product",productschema);

module.exports=product;