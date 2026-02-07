import React, { useState } from 'react';
import API, { setAuthToken } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [form, setForm] = useState({email:'', password:''});
  const nav = useNavigate();
  async function submit(e){
    e.preventDefault();
    try{
      const res = await API.post('/auth/login', form);
      const { token } = res.data;
      localStorage.setItem('token', token);
      setAuthToken(token);
      nav('/');
    }catch(err){
      alert(err?.response?.data?.message || 'Error');
    }
  }
  return (
    <div style={{padding:20}}>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input type="email" required placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
        <input type="password" required placeholder="Password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} />
        <button className="btn">Login</button>
      </form>
    </div>
  );
}
