const express = require("express");
const router = new express.Router();
const multer = require("multer");
const users = require("../model/schema");
const moment = require("moment");
const fs = require("fs");

const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}


const imgconfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./uploads");
    },
    filename: (req, file, callback) => {
        callback(null, `image-${Date.now()}-${file.originalname}`);
    }
});


const isImage = (req, file, callback) => {
    if (file.mimetype.startsWith("image")) {
        callback(null, true);
    } else {
        callback(new Error("Only image files are allowed"));
    }
};

const upload = multer({
    storage: imgconfig,
    fileFilter: isImage,
});


router.post("/register", upload.single("photo"), async (req, res) => {
    try {
        const { filename } = req.file;
        const { name } = req.body;

        if (!name || !filename) {
            return res.status(400).json({ status: 400, message: "Please fill all the fields" });
        }

        const date = moment(new Date()).format("YYYY-MM-DD");
        const userdata = new users({
            name: name,
            imgpath: filename,
            date: date,
        });

        const finaldata = await userdata.save();
        res.status(201).json({ status: 201, finaldata });
    } catch (error) {
        res.status(500).json({ status: 500, error: error.message });
    }
});
router.get("/getdata",async(req,res)=>{
    try{
        const getuser=await users.find();
        res.status(201).json({status:201,getuser})

    }catch(error){
        res.status(401).json({status:401,error})

    }
})
router.delete("/:id",async(req,res)=>{
    try{
        const {id}=req.params;
        const dltuser=await users.findByIdAndDelete({_id:id});
        res.status(201).json({status:201,dltuser})

    }catch(error){
        res.status(401).json({status:401,error})

    }
})

module.exports = router;
