import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
dotenv.config();

const products = [
  { name: 'Organic Almonds 500g', price: 599, image: 'https://via.placeholder.com/400x300?text=Almonds', description:'Crunchy organic almonds', category:'Groceries', stock:50 },
  { name: 'Organic Quinoa 1kg', price: 499, image: 'https://via.placeholder.com/400x300?text=Quinoa', description:'High protein quinoa', category:'Groceries', stock:30 },
  { name: 'Organic Turmeric Powder 250g', price: 199, image: 'https://via.placeholder.com/400x300?text=Turmeric', description:'Pure turmeric', category:'Spices', stock:100 }
];

mongoose.connect(process.env.MONGO_URI).then(async ()=>{
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('Seeded products');
  process.exit(0);
}).catch(err=>{
  console.error(err);
  process.exit(1);
});
