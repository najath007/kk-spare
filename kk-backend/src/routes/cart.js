const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { authMiddleware } = require('../middleware/auth');
router.use(authMiddleware);
router.get('/', async (req, res) => {
  try {
    const [items] = await db.execute(
      `SELECT c.id, c.quantity, p.id AS product_id, p.name, p.price, p.image, p.stock, p.badge
       FROM cart c JOIN products p ON c.product_id = p.id WHERE c.user_id = ?`,
      [req.user.id]
    );
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    res.json({ items, total });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});
router.post('/', async (req, res) => {
  try {
    const { product_id, quantity = 1 } = req.body;
    await db.execute(
      `INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE quantity = quantity + ?`,
      [req.user.id, product_id, quantity, quantity]
    );
    res.status(201).json({ message: 'Added to cart' });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});
router.put('/:product_id', async (req, res) => {
  try {
    const { quantity } = req.body;
    if (quantity < 1) {
      await db.execute('DELETE FROM cart WHERE user_id = ? AND product_id = ?', [req.user.id, req.params.product_id]);
      return res.json({ message: 'Item removed' });
    }
    await db.execute('UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?', [quantity, req.user.id, req.params.product_id]);
    res.json({ message: 'Cart updated' });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});
router.delete('/:product_id', async (req, res) => {
  try {
    await db.execute('DELETE FROM cart WHERE user_id = ? AND product_id = ?', [req.user.id, req.params.product_id]);
    res.json({ message: 'Item removed from cart' });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});
router.delete('/', async (req, res) => {
  try {
    await db.execute('DELETE FROM cart WHERE user_id = ?', [req.user.id]);
    res.json({ message: 'Cart cleared' });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});
module.exports = router;