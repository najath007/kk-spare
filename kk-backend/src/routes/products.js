const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
router.get('/', async (req, res) => {
  try {
    const { category, brand, model, year, type, badge, search } = req.query;
    let query = `SELECT DISTINCT p.id, p.name, p.price, p.badge, p.image, p.type, p.stock, p.warranty, c.name AS category FROM products p JOIN categories c ON p.category_id = c.id`;
    const conditions = [];
    const params = [];
    if (brand || model || year) {
      query += ` JOIN product_compatibility pc ON p.id = pc.product_id JOIN brands b ON pc.brand_id = b.id JOIN models m ON pc.model_id = m.id JOIN years y ON pc.year_id = y.id`;
      if (brand) { conditions.push('b.name = ?'); params.push(brand); }
      if (model) { conditions.push('m.name = ?'); params.push(model); }
      if (year) { conditions.push('y.year = ?'); params.push(year); }
    }
    if (category) { conditions.push('c.name = ?'); params.push(category); }
    if (type) { conditions.push('p.type = ?'); params.push(type); }
    if (badge) { conditions.push('p.badge = ?'); params.push(badge); }
    if (search) { conditions.push('p.name LIKE ?'); params.push(`%${search}%`); }
    if (conditions.length) query += ' WHERE ' + conditions.join(' AND ');
    query += ' ORDER BY p.id';
    const [products] = await db.execute(query, params);
    res.json(products);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});
router.get('/:id', async (req, res) => {
  try {
    const [products] = await db.execute(`SELECT p.*, c.name AS category FROM products p JOIN categories c ON p.category_id = c.id WHERE p.id = ?`, [req.params.id]);
    if (!products.length) return res.status(404).json({ message: 'Product not found' });
    const product = products[0];
    const [compat] = await db.execute(`SELECT b.name AS brand, m.name AS model, y.year FROM product_compatibility pc JOIN brands b ON pc.brand_id = b.id JOIN models m ON pc.model_id = m.id JOIN years y ON pc.year_id = y.id WHERE pc.product_id = ?`, [product.id]);
    const compatMap = {};
    for (const row of compat) {
      if (!compatMap[row.brand]) compatMap[row.brand] = { brand: row.brand, models: new Set(), years: new Set() };
      compatMap[row.brand].models.add(row.model);
      compatMap[row.brand].years.add(String(row.year));
    }
    product.compatibility = Object.values(compatMap).map(c => ({ brand: c.brand, models: [...c.models], years: [...c.years] }));
    const [related] = await db.execute(`SELECT p.id, p.name, p.price, p.image, p.badge FROM bought_together bt JOIN products p ON bt.related_product_id = p.id WHERE bt.product_id = ?`, [product.id]);
    product.boughtTogether = related;
    res.json(product);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { name, price, category_id, badge, image, type, stock, warranty } = req.body;
    const [result] = await db.execute(`INSERT INTO products (name, price, category_id, badge, image, type, stock, warranty) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [name, price, category_id, badge || '', image, type, stock || 0, warranty || 'N/A']);
    res.status(201).json({ message: 'Product created', id: result.insertId });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { name, price, category_id, badge, image, type, stock, warranty } = req.body;
    await db.execute(`UPDATE products SET name=?, price=?, category_id=?, badge=?, image=?, type=?, stock=?, warranty=? WHERE id=?`, [name, price, category_id, badge || '', image, type, stock, warranty, req.params.id]);
    res.json({ message: 'Product updated' });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await db.execute('DELETE FROM products WHERE id = ?', [req.params.id]);
    res.json({ message: 'Product deleted' });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});
module.exports = router;