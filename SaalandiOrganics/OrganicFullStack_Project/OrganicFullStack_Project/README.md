# Organic E-commerce Fullstack Project (Scaffold)

This zip contains a full-stack scaffold for an organic products e-commerce site.

## Stack
- Frontend: React (Vite), Axios, Stripe React
- Backend: Node.js, Express.js, MongoDB (Mongoose)
- Auth: JWT
- Payment: Stripe Payment Intents

## Setup

### Backend
1. cd server
2. npm install
3. Copy `.env.example` to `.env` and fill values (MONGO_URI, JWT_SECRET, STRIPE_SECRET_KEY, FRONTEND_URL)
4. npm run dev (make sure nodemon is installed)

### Seed products (optional)
node seedProducts.js

### Frontend
1. cd client
2. npm install
3. Create a `.env` at client root with:
   VITE_API_URL=http://localhost:5000/api
   VITE_STRIPE_PUBLISHABLE=pk_test_your_key
4. npm run dev (Vite)

## Notes
- This scaffold is minimal but functional. For production, secure routes, add admin checks, webhooks for Stripe, validation, rate limiting, logging, tests, and deploy to platforms like Vercel/Render.
