import React from 'react';
import { Link } from 'react-router-dom';

export default function Home(){
  return (
    <main style={{padding:20}}>
      <h1>Welcome to Organic Store</h1>
      <p>Fresh organic products delivered to your door.</p>
      <Link to="/products" className="btn">Shop products</Link>
    </main>
  );
}
