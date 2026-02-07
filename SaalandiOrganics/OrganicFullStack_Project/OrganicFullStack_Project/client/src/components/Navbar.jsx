import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar(){
  return (
    <nav className="nav">
      <div className="nav-left">
        <Link to="/" className="brand">Organic Store</Link>
        <Link to="/products">Products</Link>
      </div>
      <div className="nav-right">
        <Link to="/cart">Cart</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}
