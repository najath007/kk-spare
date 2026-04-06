require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (
      origin.includes('vercel.app') ||
      origin.includes('localhost')
    ) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
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