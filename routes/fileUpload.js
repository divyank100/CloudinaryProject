const express=require("express");
const router=express.Router();

const {localFileUpload,imageUpload,videoUpload,sizeReducer}=require("../controllers/fileupload");

// API Route
router.post("/localFileUpload",localFileUpload);
router.post("/imageUpload",imageUpload);
router.post("/videoUpload",videoUpload);
router.post("/sizeReducer",sizeReducer);

module.exports=router;

