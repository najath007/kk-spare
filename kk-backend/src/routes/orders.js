const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
router.use(authMiddleware);
router.post('/', async (req, res) => {
  const conn = await (require('../config/db')).getConnection();
  try {
    await conn.beginTransaction();
    const { address_id, payment_method = 'COD' } = req.body;
    const [cartItems] = await conn.execute(
      `SELECT c.quantity, p.id AS product_id, p.price, p.stock, p.name
       FROM cart c JOIN products p ON c.product_id = p.id WHERE c.user_id = ?`,
      [req.user.id]
    );
    if (!cartItems.length) { await conn.rollback(); return res.status(400).json({ message: 'Cart is empty' }); }
    for (const item of cartItems) {
      if (item.stock < item.quantity) { await conn.rollback(); return res.status(400).json({ message: `Insufficient stock for ${item.name}` }); }
    }
    const total = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const [orderResult] = await conn.execute(
      `INSERT INTO orders (user_id, address_id, total_amount, payment_method) VALUES (?, ?, ?, ?)`,
      [req.user.id, address_id || null, total, payment_method]
    );
    const orderId = orderResult.insertId;
    for (const item of cartItems) {
      await conn.execute('INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)', [orderId, item.product_id, item.quantity, item.price]);
      await conn.execute('UPDATE products SET stock = stock - ? WHERE id = ?', [item.quantity, item.product_id]);
    }
    await conn.execute('DELETE FROM cart WHERE user_id = ?', [req.user.id]);
    await conn.commit();
    res.status(201).json({ message: 'Order placed successfully', orderId, total });
  } catch (err) { await conn.rollback(); console.error(err); res.status(500).json({ message: 'Server error' }); }
  finally { conn.release(); }
});
router.get('/', async (req, res) => {
  try {
    const [orders] = await db.execute(`SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC`, [req.user.id]);
    for (const order of orders) {
      const [items] = await db.execute(`SELECT oi.quantity, oi.unit_price, p.name, p.image FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE oi.order_id = ?`, [order.id]);
      order.items = items;
    }
    res.json(orders);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});
router.get('/:id', async (req, res) => {
  try {
    const [orders] = await db.execute(`SELECT o.*, a.address_line1, a.city, a.state, a.pincode FROM orders o LEFT JOIN addresses a ON o.address_id = a.id WHERE o.id = ? AND o.user_id = ?`, [req.params.id, req.user.id]);
    if (!orders.length) return res.status(404).json({ message: 'Order not found' });
    const [items] = await db.execute(`SELECT oi.quantity, oi.unit_price, p.id AS product_id, p.name, p.image FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE oi.order_id = ?`, [req.params.id]);
    orders[0].items = items;
    res.json(orders[0]);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});
router.patch('/:id/cancel', async (req, res) => {
  try {
    const [orders] = await db.execute('SELECT * FROM orders WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
    if (!orders.length) return res.status(404).json({ message: 'Order not found' });
    if (!['pending', 'confirmed'].includes(orders[0].status)) return res.status(400).json({ message: 'Order cannot be cancelled at this stage' });
    await db.execute('UPDATE orders SET status = ? WHERE id = ?', ['cancelled', req.params.id]);
    res.json({ message: 'Order cancelled' });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});
router.patch('/:id/status', adminMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    await db.execute('UPDATE orders SET status = ? WHERE id = ?', [status, req.params.id]);
    res.json({ message: 'Order status updated' });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});
module.exports = router;