const mongoose=require("mongoose");
require("dotenv").config();

exports.dbConnect=()=>mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(
    console.log("Mongo connection successfull")
).catch((error)=>{
    console.log("Error hai!");
    console.log(error);
    process.exit(1);
})