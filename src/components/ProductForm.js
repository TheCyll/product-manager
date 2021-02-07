import React, { useState } from 'react';
import FormInputs from './FormInputs';
import ImageUploader from './ImageUploader';
import { API_URL } from '../utils/constants';
import axios from 'axios';

const ProductForm = () => {

  const [formValues, setFormValues] = useState('');
  const [image, setImage] = useState(''); 
  const [submitError, setSubmitError] = useState(''); 
  
  const setImageFile = (editedImageData) => {   
    setImage(editedImageData); 
  }

  const handleSubmit = async (acceptedFormValues) => { 
    try {

      setFormValues(acceptedFormValues); 
      const formData = new FormData();

      for (const property in formValues) {
        formData.append(`${property}`, formValues[property]);
      }   

      // if(image) {
        formData.append('image', image);
      // }
      
      await axios.post(`${API_URL}/product/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setSubmitError('');

    } catch (error) {
      console.log(error);
    } 
  }

  return (
    <div className="main-content">
    <FormInputs onHandleSubmit={ handleSubmit }/>    
    <ImageUploader onSetImage={ setImageFile }/>
    </div>
  )
}

export default ProductForm;