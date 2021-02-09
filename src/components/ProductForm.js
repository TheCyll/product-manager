import React, { useEffect, useState } from 'react';
import FormInputs from './FormInputs';
import ImageUploader from './ImageUploader';
import { API_URL } from '../utils/constants';
import axios from 'axios';
// no libraries code
import { dataURItoBlob } from '../utils/helpers';

const ProductForm = () => {
  
  const [image, setImage] = useState({});
  const [submitError, setSubmitError] = useState('');   

  const setImageFile = (editedImageSrc, imageData ) => {   
    
    if (editedImageSrc.length > 0 && Object.keys(imageData).length > 0) {
      const imageBlob = dataURItoBlob(editedImageSrc);
      const imageFile = new File([imageBlob], imageData.name, {        
        lastModified: imageData.lastModified,
        type: imageData.type
      })
      setImage(imageFile);
    }
  }

  const handleSubmit = async (acceptedFormValues) => { 
    try {
      
      const formData = new FormData();

      for (const property in acceptedFormValues) {
        formData.append(`${property}`, acceptedFormValues[property]);
      }   

      if(image instanceof File) {
        formData.append('image', image);
      }      
      
      setSubmitError('');

      let response = await axios.post(`${API_URL}/products/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data);

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