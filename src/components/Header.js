import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="products-header">
      <h1>Product manager</h1>
      <nav>
        <NavLink activeClassName="active" to="/" exact={true}>
          Create product
        </NavLink>
        <NavLink activeClassName="active" to="/products">
          Products
        </NavLink>
      </nav>
    </header>
  )
}

export default Header;
