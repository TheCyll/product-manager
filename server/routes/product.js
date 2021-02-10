const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
// const pathSys = require('path');
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

    let product = {
      ...productValues,
      image_path: '',
      image_mimetype: ''  
    };    
  
    if( req.file ) {    
      const { path, mimetype } = req.file;
  
      product.image_path = path;
      product.image_mimetype = mimetype; 
    } else {     
      const path = 'images\\resources\\no_image_default.png';
      const mimetype = 'image/png';

      product.image_path = path;
      product.image_mimetype = mimetype; 
    }

    // verify new product
    const { error } = validateProduct(product);
    if ( error ) {
      return res.status(400).json({
        ok: false,
        err: error.details[0].message
      })
    }

    product = new Product( product );

    const queryResponse = await product.save(); 

    res.status(200).json({
      ok: true,
      data: queryResponse
    });
    
  } catch (error) {    
    res.status(400).json({
      ok: false,
      err: error.message      
    });
  } 
});

router.get('/getProducts', async(req, res) => {
  try {
    const queryResponse = await Product.find({}).exec();

    res.status(200).json({
      ok: true,
      data: queryResponse
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      err: error.message
    })
  }
});

router.get('/getProduct/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const queryResponse = await Product.findById(id).exec();

    if( !queryResponse ) {
      res.status(400).json({
        ok: false,
        err: "Bad request, provide a valid id"
      })
    } else {
      res.status(200).json({
        ok: true,
        data: queryResponse
      })
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      err: error.message
    })
  }
});

router.put('/update/:id', upload.single('image'), async(req, res) => {
  try {
    const { id } = req.params;
    const newProductValues = req.body;

    // structure of a new product
    const newProduct = {
      ...newProductValues,
      image_path: '',
      image_mimetype: '' 
    }

    // set new image
    if( req.file ) {
      const { path, mimetype } = req.file;
  
      newProduct.image_path = path;
      newProduct.image_mimetype = mimetype; 
    } else {
      const path = 'images\\resources\\no_image_default.png';
      const mimetype = 'image/png';

      newProduct.image_path = path;
      newProduct.image_mimetype = mimetype; 
    } 

    // verify new product
    const { error } = validateProduct(newProduct);
    if ( error ) {
      return res.status(400).json({
        ok: false,
        err: error.details[0].message
      })
    }

    // delete old image
    const queryResponseBefore = await Product.findById(id).exec();
    const path = queryResponseBefore.image_path;
      if ( path ) {
        fs.unlink(path, (err) => {
          if (err) throw err;
          console.log('The image has been deleted');
        });
      }
    
    // update document
    const queryResponse = await Product.findByIdAndUpdate(id, newProduct, { new: true, runValidators: true } ).exec();
    
    if ( !queryResponseBefore || !queryResponse ) {
      res.status(400).json({
        ok: false,
        err: "The product does not exist, provide a valid id"
      });
    } else {
      res.status(200).json({
        ok:true,
        data: queryResponse
      })
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      err: error.message
    })
  }
});

router.delete('/delete/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const queryResponse = await Product.findByIdAndDelete(id).exec();

    if ( !queryResponse ) {
      res.status(400).json({
        ok: false,
        err: "The document does not exist, provide a valid id"
      });
    } else {

      const path = queryResponse.image_path;

      if ( path && path !== 'images\\resources\\no_image_default.png') {
        fs.unlink(path, (err) => {
          if (err) throw err;
          console.log('The image has been deleted');
        });
      }

      res.status(200).json({
        ok: true,
        data: queryResponse
      });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      err: error.message
    })
  }
});

module.exports = router;