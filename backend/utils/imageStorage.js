const multer = require("multer");
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        // async code using `req` and `file`
        // ...
        return {
            folder: 'medium',
            public_id: Date.now().toString(),
            //original format
        };
    },
});
const upload = multer({ storage: storage })

module.exports=upload;