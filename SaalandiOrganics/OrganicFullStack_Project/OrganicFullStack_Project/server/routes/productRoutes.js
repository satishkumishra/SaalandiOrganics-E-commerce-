import express from 'express';
import Product from '../models/Product.js';
const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get product by id
router.get('/:id', async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ message: 'Not found' });
    res.json(p);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create product (simple, no admin auth here; extend as needed)
router.post('/', async (req, res) => {
  try {
    const p = await Product.create(req.body);
    res.json(p);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
