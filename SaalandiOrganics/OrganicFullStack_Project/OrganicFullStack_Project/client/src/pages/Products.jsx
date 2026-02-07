import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';

export default function Products(){
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    API.get('/products').then(r => setProducts(r.data)).catch(console.error);
  },[]);

  return (
    <div style={{padding:20}}>
      <h2>Products</h2>
      <div className="grid">
        {products.map(p => (
          <div key={p._id} className="card">
            <img src={p.image} alt={p.name} />
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
            <Link to={'/product/'+p._id} className="btn">View</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
