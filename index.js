const express=require("express");
const app=express();

require("dotenv").config();

app.use(express.json());
const fileUpload=require("express-fileupload");
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir: '/tmp/'
}));

const db=require("./config/database");
db.dbConnect();

const cloudinary=require("./config/cloudinary");
cloudinary.cloudinaryConnect();


const Uploadd=require("./routes/fileUpload");
app.use('/api/v1/upload',Uploadd);

app.listen(3000,()=>{
    console.log(`App is listening at 3000`);
});