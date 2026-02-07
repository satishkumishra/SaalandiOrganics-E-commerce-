import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import API from '../services/api';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE || '');

function CheckoutForm(){ 
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);
  const [orderId, setOrderId] = useState(null);

  useEffect(()=>{
    const cart = JSON.parse(localStorage.getItem('cart')||'[]');
    async function create(){
      const token = localStorage.getItem('token');
      if(token) API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const res = await API.post('/orders/create', { items: cart, shipping: 0 });
      setClientSecret(res.data.clientSecret);
      setOrderId(res.data.orderId);
    }
    create().catch(console.error);
  },[]);

  async function handleSubmit(e){
    e.preventDefault();
    if(!stripe || !elements) return;
    setLoading(true);
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });
    if(result.error){
      alert(result.error.message);
      setLoading(false);
    } else {
      // Payment successful - confirm on server
      await API.post(`/orders/${orderId}/confirm`);
      localStorage.removeItem('cart');
      alert('Payment successful!');
      setLoading(false);
      window.location.href = '/';
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{maxWidth:500, margin:'20px auto'}}>
      <CardElement />
      <button className="btn" disabled={!clientSecret || loading}>Pay</button>
    </form>
  );
}

export default function Checkout(){
  return (
    <div style={{padding:20}}>
      <h2>Checkout</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}
