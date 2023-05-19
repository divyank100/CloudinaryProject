const File=require("../models/file");
const cloudinary = require('cloudinary').v2;

exports.localFileUpload=async (req,res)=>{
    try{
        // Fetch file
        const file=req.files.file;
        console.log("File->",file);

        let path=__dirname+"files"+Date.now()+`.${file.name.split('.')[1]}`;
        console.log("Path->");
        console.log(path);

        file.mv(path,(err)=>{
            console.log(err);
        });

        res.json({
            success:true,
            message:"Local file uploaded successfully"
        })
    }
    catch(error){
        console.log(error);
    }
}

// Image Upload handler

function isSupported(type,supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadToCloudinary(file,folder,quality){
    const options={folder};
    if(quality){
        options.quality=quality;
    }
    options.resource_type="auto";
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}

exports.imageUpload= async (req,res)=>{
    try{
        const {name,email,tags}=req.body;
        const file=req.files.image;

        const supportedTypes=["jpg","jpeg"];
        const type=file.name.split('.')[1].toLowerCase();

        if(!isSupported(type,supportedTypes)){
            return res.status(400).json({
                success:false,
                messgae:"File type not supported"
            });
        }

        console.log("Image uploading to Cloudinary....");
        const response=await uploadToCloudinary(file,"CodeHelp");
        console.log(response);

        const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        });

        res.status(200).json({
            success:true,
            message:"Image uploaded successfully",
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error hai!"
        })
    }
}


// Video Upload handler
exports.videoUpload= async (req,res)=>{
    try{
        const {name,email,tags}=req.body;
        const file=req.files.video;

        const supportedTypes=["mp4","mov"];
        const type=file.name.split('.')[1].toLowerCase();

        if(!isSupported(type,supportedTypes)){
            return res.status(400).json({
                success:false,
                messgae:"File type not supported"
            });
        }

        console.log("Video uploading to Cloudinary....");
        const response=await uploadToCloudinary(file,"CodeHelp");
        console.log(response);

        const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        });

        return res.status(200).json({
            success:true,
            message:"Image uploaded successfully",
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error hai!"
        })
    }
}

// Size Reducer handler
exports.sizeReducer= async (req,res)=>{
    try{
        const {name,email,tags}=req.body;
        const file=req.files.video;

        const supportedTypes=["mp4","mov"];
        const type=file.name.split('.')[1].toLowerCase();

        if(!isSupported(type,supportedTypes)){
            return res.status(400).json({
                success:false,
                messgae:"File type not supported"
            });
        }

        console.log("Video uploading to Cloudinary....");
        const response=await uploadToCloudinary(file,"CodeHelp",20);
        console.log(response);

        const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        });

        return res.status(200).json({
            success:true,
            message:"Image uploaded successfully",
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error hai!"
        })
    }
}


