import React, { useEffect, useState } from 'react';
import FormInputs from './FormInputs';
import ImageUploader from './ImageUploader';
import { API_URL } from '../utils/constants';
import axios from 'axios';
// no libraries code
import { dataURItoBlob } from '../utils/helpers';

const ProductForm = () => {

  const [formValues, setFormValues] = useState('');
  const [imageURI, setImageURI] = useState(''); 
  const [imageData, setImageData] = useState({});
  const [image, setImage] = useState({});
  const [submitError, setSubmitError] = useState('');
  console.log(image);

  const setImageFile = (editedImage, imageData ) => {   
    setImageURI(editedImage);
    setImageData(imageData);
     
    if (editedImage.length > 0 && Object.keys(imageData).length > 0) {
      const imageBlob = dataURItoBlob(editedImage);
      const imageFile = new File([imageBlob], imageData.name, {        
        lastModified: imageData.lastModified,
        type: imageData.type
      })
      setImage(imageFile);
    }
  }

  const handleSubmit = async (acceptedFormValues) => { 
    try {

      setFormValues(acceptedFormValues); 
      const formData = new FormData();

      for (const property in formValues) {
        formData.append(`${property}`, formValues[property]);
      }   

      if(image) {
        formData.append('image', image);
      }
      
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