import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function Product(){
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    API.get('/products/'+id).then(r=> setProduct(r.data)).catch(()=>{});
  },[id]);

  if(!product) return <div style={{padding:20}}>Loading...</div>;

  return (
    <div style={{padding:20}}>
      <button onClick={()=>navigate(-1)} className="btn">Back</button>
      <h2>{product.name}</h2>
      <img src={product.image} alt="" style={{maxWidth:400}} />
      <p>{product.description}</p>
      <p>₹{product.price}</p>
      <button className="btn" onClick={()=>{
        const cart = JSON.parse(localStorage.getItem('cart')||'[]');
        const existing = cart.find(i=>i._id===product._id);
        if(existing) existing.qty += 1; else cart.push({...product, qty:1});
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Added to cart');
      }}>Add to cart</button>
    </div>
  );
}
