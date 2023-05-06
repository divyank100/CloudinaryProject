const File=require("../models/file");

exports.localFileUpload=async ()=>{
    try{
        // Fetch file
        const file=req.files.file;
        console.log("File->",file);

        let path=__dirname+"files"+Date.now()+`.${file.name.split('.')[1]}`;
        console.log("Path->",path);

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