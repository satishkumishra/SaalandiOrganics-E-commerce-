import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    price: Number,
    qty: Number
  }],
  subtotal: Number,
  shipping: Number,
  total: Number,
  isPaid: { type: Boolean, default: false },
  paymentIntentId: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Order', orderSchema);
