import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart(){
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(()=> setCart(JSON.parse(localStorage.getItem('cart')||'[]')), []);

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div style={{padding:20}}>
      <h2>Your Cart</h2>
      {!cart.length && <div>No items. <Link to="/products">Shop</Link></div>}
      <ul>
        {cart.map(it=> (
          <li key={it._id}>
            {it.name} x {it.qty} - ₹{it.price * it.qty}
            <button onClick={()=>{
              const newc = cart.filter(c=> c._id !== it._id);
              setCart(newc);
              localStorage.setItem('cart', JSON.stringify(newc));
            }}>Remove</button>
          </li>
        ))}
      </ul>
      <div>Total: ₹{total}</div>
      <div>
        <button onClick={()=> navigate('/checkout')} className="btn">Checkout</button>
      </div>
    </div>
  );
}
