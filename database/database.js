const mongoose =require ('mongoose');
require('dotenv').config();
const url=process.env.URL;
mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex:true
}).then((db) => {
    console.log("database connected " +url);

},(err)=>console.log(err));
