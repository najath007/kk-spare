const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { authMiddleware } = require('../middleware/auth');

router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    const [wishlist] = await db.execute(`
      SELECT p.*, w.added_at 
      FROM wishlist w 
      JOIN products p ON w.product_id = p.id 
      WHERE w.user_id = ? 
      ORDER BY w.added_at DESC
    `, [req.user.id]);
    res.json(wishlist);
  } catch (err) { 
    console.error(err);
    res.status(500).json({ message: 'Server error' }); 
  }
});

router.post('/:productId', async (req, res) => {
  try {
    await db.execute('INSERT IGNORE INTO wishlist (user_id, product_id) VALUES (?, ?)', [req.user.id, req.params.productId]);
    res.status(201).json({ message: 'Added to wishlist' });
  } catch (err) { 
    console.error(err);
    res.status(500).json({ message: 'Server error' }); 
  }
});

router.delete('/:productId', async (req, res) => {
  try {
    await db.execute('DELETE FROM wishlist WHERE user_id = ? AND product_id = ?', [req.user.id, req.params.productId]);
    res.json({ message: 'Removed from wishlist' });
  } catch (err) { 
    console.error(err);
    res.status(500).json({ message: 'Server error' }); 
  }
});

module.exports = router;
