import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import ProductsPage from '../components/ProductsPage';
import Header from '../components/Header';

const AppRouter = () => (  
  
  <BrowserRouter>
    <div className="main-container">
      <Header />
      <div className="main-content">
      <Switch>
          <Route component={ProductForm} path="/" exact={true} />
          <Route component={ProductsPage} path="/products" />
      </Switch>
      </div>      
    </div>
  </BrowserRouter>
);

export default AppRouter;