const express = require('express');
const multer = require('multer');
const router = express.Router();
// const path = require('path');
const { Product, validateProduct } = require('../models/product');

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './images');
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    }
  }),
  limits: {
    // 1000000 bytes = 1 MB
    fileSize: 1000000 
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|bmp)$/)) {
      return cb(
        new Error(
          'Only upload files with jpg, jpeg, png, and bitmap format'
        )
      );
    }
    cb(undefined, true); // continue with upload
  }
});

router.post('/create', upload.single('image'), async (req, res) => {
  try {
    const productValues = req.body;
  
    const product = new Product({
      ...productValues,
      image_path: '',
      image_mimetype: ''  
    });
  
    if( req.file ) {    
      const { path, mimetype } = req.file;
  
      product.image_path = path;
      product.image_mimetype = mimetype; 
    }

    const dbProduct = await product.save();    

    res.status(200).json({
      ok: true,
      data: dbProduct
    });
    
  } catch (error) {
    res.status(400).json({
      ok: false,
      err: {
        message: "Error while uploading the product"
      }
    });
  } 
}, (error, req, res, next) => {
  if (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;