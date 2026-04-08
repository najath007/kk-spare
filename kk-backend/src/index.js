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
app.use('/api/wishlist', require('./routes/wishlist'));
app.get('/api/health', (req, res) => res.json({ status: 'OK', project: 'KK Spare Parts' }));
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));
const PORT = process.env.PORT || 5000;

const db = require('./config/db');
async function initializeDatabase() {
  try {
    const conn = await db.getConnection();
    await conn.query(`
      CREATE TABLE IF NOT EXISTS wishlist (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        product_id INT NOT NULL,
        added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
        UNIQUE KEY unique_wishlist (user_id, product_id)
      )
    `);
    await conn.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        product_id INT NOT NULL,
        rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
        comment TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
        UNIQUE KEY unique_review (user_id, product_id)
      )
    `);
    conn.release();
    console.log('✅ Database migration verified');
  } catch (err) {
    console.error('❌ Failed to verify database migration:', err);
  }
}

app.listen(PORT, async () => {
    await initializeDatabase();
    console.log(`✅ KK Spare Parts API running on http://localhost:${PORT}`);
});