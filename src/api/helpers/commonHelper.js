const multer = require('multer');
const path = require('path');
const fs = require('fs');
const filesDir = "./public/images";
fs.mkdir(filesDir, { recursive: true }, (err) => {
    if (err) throw err;
});

// Configuration of multer
const multerStorage = multer.diskStorage({
    destination: (req,file, cb) =>{
        const module = req.url.split('/')[1];
        const directory_name = `./public/images`;
        fs.mkdir(directory_name, { recursive: true}, (error) => {
            if(error){
                throw error
            }
        });
        cb(null, path.resolve(`./public/images`));
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    },
})

const upload = multer({storage: multerStorage });

module.exports = { upload }