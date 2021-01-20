import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ProductForm = () => {
  return (
    <Formik 
      initialValues={{
        name: '',
        description:'',
        characteristics:'',
        brand:'',
        model:'',
        price:''
      }}
      validationSchema={Yup.object({
        name: Yup.string().max(50, 'Must be 50 characters or less').required('Required'),
        description: Yup.string().max(50, 'Must be 300 characters or less').required('Required'),
        characteristics: Yup.string().max(50, 'Must be 300 characters or less').required('Required'),
        brand: Yup.string().max(50, 'Must be 30 characters or less').required('Required'),
        model: Yup.string().max(50, 'Must be 30 characters or less').required('Required'),
        price: Yup.number().positive('The price should be a positive number').required('Required')
        //TODO agregate automatic date
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }} 
    >
      <Form className="product-form">
        <label htmlFor="name">Name</label>
        <Field name="name" type="text" />
        <ErrorMessage name="name" />
        <label htmlFor="description">Description</label>
        <Field name="description" as="textarea"/>
        <ErrorMessage name="description" />
        <label htmlFor="characteristics">Characteristics</label>
        <Field name="characteristics" as="textarea"/>
        <ErrorMessage name="characteristics" />
        <label htmlFor="brand">Brand</label>
        <Field name="brand" type="text" />
        <ErrorMessage name="brand" />
        <label htmlFor="model">Model</label>
        <Field name="model" type="text" />
        <ErrorMessage name="model" />
        <label htmlFor="price">Price</label>
        <Field name="price" type="number" />
        <ErrorMessage name="price" />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  )
}

export default ProductForm;