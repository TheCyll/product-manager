import React, { useState } from 'react';
import FormInputs from './FormInputs';
import ImageUploader from './ImageUploader';


const ProductForm = () => {

  const [image, setImage] = useState('');
  const [formData, setFormData] = useState('');
  console.log(formData);  
  
  const setImageFile = (editedImageData) => {
    setImage(editedImageData); 
  }

  const handleSubmit = (acceptedFormData) => {         
    setFormData(acceptedFormData);      
  }

  return (
    <div className="main-content">
    <FormInputs onHandleSubmit={ handleSubmit }/>    
    <ImageUploader onSetImage={ setImageFile }/>
    </div>
  )
}

export default ProductForm;