import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const FormInputs = ({onHandleSubmit}) => { 
  return (
    <Formik 
      initialValues={{
        name: '',
        description: '',
        characteristics: '',
        brand: '',
        model: '',
        price: '',
        stock: ''
      }}
      validationSchema={ Yup.object({
        name: Yup.string().max(50, 'Must be 50 characters or less').required('Required'),
        description: Yup.string().max(300, 'Must be 300 characters or less').required('Required'),
        characteristics: Yup.string().max(300, 'Must be 300 characters or less').required('Required'),
        brand: Yup.string().max(50, 'Must be 30 characters or less').required('Required'),
        model: Yup.string().max(50, 'Must be 30 characters or less').required('Required'),
        price: Yup.number('The input should be a number')
          .positive('The price should be a positive number')
          .required('Required field, should be a number'),
        stock: Yup.number().integer('The stock should be an integer')
          .min(0, 'The price should be a non-negative number')
          .required('Required field, should be a number')        
      })}
      onSubmit={(values, { setSubmitting }) => {       
        // pass the form data to ProductForm component        
        onHandleSubmit(values);        
        setSubmitting(false);        
      }} 
    >
      <Form className="product-form" noValidate>      
        <label htmlFor="name">Name</label>
        <Field name="name" type="text" />
        <ErrorMessage component="span" className="error-message" name="name" />
        <label htmlFor="description">Description</label>
        <Field name="description" as="textarea"/>
        <ErrorMessage component="span" className="error-message" name="description" />
        <label htmlFor="characteristics">Characteristics</label>
        <Field name="characteristics" as="textarea"/>
        <ErrorMessage component="span" className="error-message" name="characteristics" />
        <label htmlFor="brand">Brand</label>
        <Field name="brand" type="text" />
        <ErrorMessage component="span" className="error-message" name="brand" />
        <label htmlFor="model">Model</label>
        <Field name="model" type="text" />
        <ErrorMessage component="span" className="error-message" name="model" />
        <label htmlFor="price">Price</label>
        <Field name="price" type="number" />
        <ErrorMessage component="span" className="error-message" name="price" />
        <label htmlFor="stock">Stock</label>
        <Field name="stock" type="number" />
        <ErrorMessage component="span" className="error-message" name="stock" />        
        <button type="submit">Submit</button>                
      </Form>
    </Formik>
  )
}

export default FormInputs;