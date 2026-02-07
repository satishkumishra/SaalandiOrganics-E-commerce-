import express from 'express';
import Order from '../models/Order.js';
import { auth } from '../middleware/auth.js';
import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

// Create a payment intent and order
router.post('/create', auth, async (req, res) => {
  try {
    const { items, shipping } = req.body;
    if (!items || !items.length) return res.status(400).json({ message: 'Cart empty' });

    const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
    const shippingFee = shipping || (subtotal > 999 ? 0 : 49);
    const total = subtotal + shippingFee;

    // Create Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), // in paise
      currency: 'inr',
      payment_method_types: ['card']
    });

    // Save order with isPaid=false (will confirm on webhook or client confirm)
    const order = await Order.create({
      user: req.userId,
      items: items.map(it => ({
        product: it.productId || null,
        name: it.name,
        price: it.price,
        qty: it.qty
      })),
      subtotal,
      shipping: shippingFee,
      total,
      isPaid: false,
      paymentIntentId: paymentIntent.id
    });

    res.json({ clientSecret: paymentIntent.client_secret, orderId: order._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Confirm order payment (simple endpoint - in prod use webhooks)
router.post('/:id/confirm', auth, async (req, res) => {
  try {
    const o = await Order.findById(req.params.id);
    if (!o) return res.status(404).json({ message: 'Order not found' });
    o.isPaid = true;
    await o.save();
    res.json({ message: 'Order confirmed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
