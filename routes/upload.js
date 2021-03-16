const router = require('express').Router();
// for image upload
const cloudinary = require('cloudinary');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');
//  remove large file from tmp after upload
const fs = require('fs');

// we will upload image on cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,

});

// 1 Upload image api with authenticated only admin can use-> role=1
router.post('/upload', auth, authAdmin, (req, res)=>{
    try{
        console.log(req.files)

        if(!req.files || Object.keys(req.files).length === 0) 
        return res.status(400).json({msg: 'No file uploaded!'})


        const file = req.files.file;

        // 1024*1024* = 1mb
        if(file.size > 1024*1024) {

        // remove large file after upload
        removeTmp(file.tempFilePath)

        return res.status(400).json({msg: 'Size is too large!'})
        }
                

        if(file.mimetype !== "image/jpeg" && file.mimetype !== "image/png"){

        // remove large file after upload
        removeTmp(file.tempFilePath)
        return res.status(400).json({msg: "File format is incorrect!"})
        }

        // upload to "https://cloudinary.com/"
        // to remove "Cannot read property 'size' of undefined"
        cloudinary.v2.uploader.upload(file.tempFilePath, {folder: "test"}, async(err, result)=> {
            if(err) throw err;

        // remove large file after upload
        removeTmp(file.tempFilePath)

        // after upload will have file in tmp
        res.json({public_id: result.public_id, url: result.secure_url });

        // res.json({result});

        // res.json('Test upload image')
        })

        

    }catch(err){
        return res.status(500).json({msg: err.message});
    }
});


// 2 Delete image api with authenticated only admin can use-> role=1
router.delete('/destroy', auth, authAdmin, (req, res)=>{
    try{
        const {public_id} = req.body;
        if(!public_id) return res.status(400).json({msg: "No images Selected"});

        // cloudinary call
        cloudinary.v2.uploader.destroy(public_id, async(err, result) =>{
            if(err) throw err;

            res.json({msg: "Deleted Image!"})
        })

    }catch(err){
        return res.status(500).json({msg: err.message});
    }
});


// after upload large size file don't upload in tmp folder
const removeTmp = (path) => {
    fs.unlink(path, err=>{
        if(err) throw err;
    })
}; 

module.exports = router;