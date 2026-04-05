require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({
  origin: ['http://localhost:5173', 'https://kk-spare.vercel.app', 'https://kk-spare-parts.vercel.app'],
  credentials: true
}));
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/brands', require('./routes/brands'));
app.use('/api/categories', require('./routes/categories'));
app.get('/api/health', (req, res) => res.json({ status: 'OK', project: 'KK Spare Parts' }));
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ KK Spare Parts API running on http://localhost:${PORT}`));