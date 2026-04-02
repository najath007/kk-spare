const express = require('express');
const router = express.Router();
const db = require('../config/db');
router.get('/', async (req, res) => {
  try {
    const [brands] = await db.execute('SELECT * FROM brands ORDER BY name');
    res.json(brands);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});
router.get('/:brandName/models', async (req, res) => {
  try {
    const [models] = await db.execute(
      `SELECT m.id, m.name FROM models m
       JOIN brands b ON m.brand_id = b.id
       WHERE b.name = ? ORDER BY m.name`,
      [req.params.brandName]
    );
    res.json(models);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});
module.exports = router;