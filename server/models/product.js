const mongoose = require('mongoose');
const Joi = require('joi');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { 
    type: String, 
    required: [true, 'The name of product is required'], 
    trim: true 
  },
  description: { 
    type: String, 
    required: [true, 'The description is required'], 
    trim: true 
  },
  characteristics: { 
    type: String,
    required: [true, 'The description is required'], 
    trim: true 
  },
  brand: { 
    type: String, 
    required: [true, 'The description is required'], 
    trim: true 
  },
  model: { 
    type: String, 
    required: [true, 'The description is required'], 
    trim: true 
  },
  price: { 
    type: Number, 
    min: [0, 'The price can\'t be a negative number'], 
    required: [true, 'The description is required']    
  },
  stock: {
    type: Number,
    min: [0, 'The stock can\'t be a negative number'],
    required: [true, 'The description is required']    
  },
  image_path: {
    type: String,
    required: true
  },
  image_mimetype: {
    type: String,
    required: true
  }
}, 
{ 
  timestamps: true 
});

const Product = mongoose.model('Product', productSchema);

function validateProduct(product) {

  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    characteristics: Joi.string().required(),
    brand: Joi.string().required(),
    model: Joi.string().required(),
    price: Joi.number()      
      .min(0)
      .precision(2)
      .required(),
    stock: Joi.number()      
      .min(0)      
      .required(),
    image_path: Joi.string().required(),
    image_mimetype: Joi.string().required()
  });

  return schema.validate(product);
}

module.exports = {
  Product,
  validateProduct
}