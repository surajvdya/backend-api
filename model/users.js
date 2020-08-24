const mongoose = require('mongoose');
const schema=mongoose.Schema;
const userschema= new schema({
first_name:{
    type: String,
    required: true
},
last_name:{
    type: String,
    required: true
},
email:{
    type: String,
    required:true,
    unique: true
},
gender:{
    type: String
},
password:{
    type:String,
    required:true,
    minlength:8
},
user_image:{
type:String
},
admin:{
    type:Boolean,
    default: 0
}
});
const user=mongoose.model("User",userschema);

module.exports=user;