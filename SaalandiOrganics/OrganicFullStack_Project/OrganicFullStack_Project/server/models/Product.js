import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  category: String,
  stock: { type: Number, default: 0 },
  tags: [String]
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
