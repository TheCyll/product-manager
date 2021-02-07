const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');
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

  console.log(req.body);
  console.log(req.file)

});

module.exports = router;