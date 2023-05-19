const mongoose=require("mongoose");
const nodemailer=require("nodemailer");

require("dotenv").config();

const fileSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }
});

// Post Middleware
fileSchema.post("save",async function(doc){
    try{
        console.log("DOC",doc);

        let transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            },

        });

        // Send mail
        let info=transporter.sendMail({
            from:`Divyank Singh`,
            to:doc.email,
            subject:"New file uploaded on Cloudinary",
            html:`<h1>Hello ji...</h1> <p>File uploaded</p> View here : <a href="${doc.imageUrl}">Image Url</a>`
        });

        console.log("INFO",info);
    }
    catch(error){
        console.error(error);
        // return res.status(500).json({
        //     success:false,
        //     message:"Something went wrong",
        // })
    }
})

const File=mongoose.model("File",fileSchema);
module.exports = File;